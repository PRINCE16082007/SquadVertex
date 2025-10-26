export default{
async fetch(request,env,ctx){
const url=new URL(request.url);
if(request.method==='OPTIONS'){
return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'}});
}
if(url.pathname.endsWith('/api/upload')&&request.method==='POST'){
try{
return await handleUpload(request,env);
}catch(e){
return jsonError(e.message||'Server error',500);
}
}
return jsonError('Not Found',404);
}
};
const CORS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'};
function jsonResponse(obj,status=200){
const h=new Headers(CORS);
h.set('Content-Type','application/json');
return new Response(JSON.stringify(obj),{status,headers:h});
}
function jsonError(msg,status=400){
return jsonResponse({error:msg},status);
}
async function handleUpload(request,env){
if(!env.DROPBOX_ACCESS_TOKEN)throw new Error('Missing DROPBOX_ACCESS_TOKEN');
const ct=request.headers.get('content-type')||'';
if(!ct.includes('multipart/form-data'))return jsonError('Expected multipart/form-data',415);
const fd=await request.formData();
const file=fd.get('file');
if(!file)return jsonError('No file provided (form field name must be "file")',400);
const uploaded=await uploadToDropbox(file,env.DROPBOX_ACCESS_TOKEN,env.DROPBOX_PATH||'/Portfolio/');
return jsonResponse({
success:true,
dropboxUrl:uploaded.url,
fileName:file.name,
fileSize:file.size||null,
fileType:file.type||null,
path:uploaded.path
});
}
async function uploadToDropbox(file,token,dropboxPath='/Portfolio/'){
const buf=await file.arrayBuffer();
// Upload (NO trailing space)
const uploadResp=await fetch('https://content.dropboxapi.com/2/files/upload',{
method:'POST',
headers:{
'Authorization':`Bearer ${token}`,
'Dropbox-API-Arg':JSON.stringify({
path:`${dropboxPath}${Date.now()}-${file.name}`,
mode:'add',
autorename:true,
mute:false
}),
'Content-Type':'application/octet-stream'
},
body:buf
});
if(!uploadResp.ok){
const t=await safeText(uploadResp);
throw new Error(`Dropbox upload failed: ${uploadResp.status} - ${t}`);
}
const meta=await uploadResp.json(); // contains path_lower
// Try to create a shared link, or reuse existing one
let sharedUrl='';
const createResp=await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',{
method:'POST',
headers:{
'Authorization':`Bearer ${token}`,
'Content-Type':'application/json'
},
body:JSON.stringify({path:meta.path_lower,settings:{}})
});
if(createResp.ok){
const j=await createResp.json();
sharedUrl=j.url||'';
}else{
// If a shared link already exists or create failed, try listing existing links
if(createResp.status===409||createResp.status===400){
const listResp=await fetch('https://api.dropboxapi.com/2/sharing/list_shared_links',{
method:'POST',
headers:{
'Authorization':`Bearer ${token}`,
'Content-Type':'application/json'
},
body:JSON.stringify({path:meta.path_lower,direct_only:true})
});
if(listResp.ok){
const lj=await listResp.json();
if(lj.links&&lj.links.length>0)sharedUrl=lj.links[0].url||'';
}
}else{
const t=await safeText(createResp);
throw new Error(`Failed to create shared link: ${createResp.status} - ${t}`);
}
}
if(!sharedUrl)throw new Error('Could not generate or find a shared link for the uploaded file');
// Convert to an embeddable permanent URL
// Use ?raw=1 so browsers render the image inline (not force-download).
// FIRST, replace ?dl=0 or ?dl=1 with ?raw=1
sharedUrl=sharedUrl.replace(/[?&]dl=[01]/g,'?raw=1');
// THEN, if ?raw= was not present and no other params exist, add ?raw=1
// OR, if ?raw= was not present but other params exist, add &raw=1
if(!sharedUrl.includes('?raw=')){
if(sharedUrl.includes('?')){
sharedUrl=sharedUrl+'&raw=1';
}else{
sharedUrl=sharedUrl+'?raw=1';
}
}
// Handle the specific case where the URL might have been converted to ?raw=1
// but still had the original dl parameter appended (like ?dl=0?raw=1)
// The replace above should handle ?dl=0 or ?dl=1, but let's ensure no double ? or &
// This regex handles ?param=value followed by ?raw=1 (shouldn't happen now)
// But let's fix any potential double separators
sharedUrl=sharedUrl.replace(/\?([^&]*?)\?/g,'?$1&');
// Ensure only one ? for the first parameter after the base URL
const baseAndQuery=sharedUrl.split('?');
if(baseAndQuery.length>2){
// This means there were multiple ? separators
const baseUrl=baseAndQuery[0];
const allParams=baseAndQuery.slice(1).join('&');
sharedUrl=baseUrl+'?'+allParams;
}
return{url:sharedUrl,path:meta.path_lower};
}
async function safeText(resp){
try{
return await resp.text();
}catch{
return'<no body>';
}
}