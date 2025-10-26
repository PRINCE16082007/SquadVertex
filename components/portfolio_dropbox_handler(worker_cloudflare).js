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
return jerr(e.message||'Server error',500);
}
}
return jerr('Not Found',404);
}
};
const CH={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'};
function jres(o,s=200){
const h=new Headers(CH);
h.set('Content-Type','application/json');
return new Response(JSON.stringify(o),{status:s,headers:h});
}
function jerr(m,s=400){
return jres({error:m},s);
}
async function handleUpload(r,env){
if(!env.DROPBOX_ACCESS_TOKEN)throw new Error('Missing DROPBOX_ACCESS_TOKEN');
const ct=r.headers.get('content-type')||'';
if(!ct.includes('multipart/form-data'))return jerr('Expected multipart/form-data',415);
const fdata=await r.formData();
const file=fdata.get('file');
if(!file)return jerr('No file provided',400);
const up=await uploadToDropbox(file,env.DROPBOX_ACCESS_TOKEN,env.DROPBOX_PATH||'/Portfolio/');
return jres({success:true,dropboxUrl:up.url,fileName:file.name,fileSize:file.size||null,fileType:file.type||null,path:up.path});
}
async function uploadToDropbox(file,token,path='/Portfolio/'){
const buf=await file.arrayBuffer();
const up=await fetch('https://content.dropboxapi.com/2/files/upload',{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Dropbox-API-Arg':JSON.stringify({path:`${path}${Date.now()}-${file.name}`,mode:'add',autorename:true,mute:false}),'Content-Type':'application/octet-stream'},body:buf});
if(!up.ok){const errorText=await up.text();throw new Error(`Dropbox upload failed: ${up.status} - ${errorText}`);}
const meta=await up.json();
let sres=null;
const make=await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({path:meta.path_lower,settings:{}})});
if(make.ok){sres=await make.json();}else{if(make.status===409||make.status===400){const list=await fetch('https://api.dropboxapi.com/2/sharing/list_shared_links',{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({path:meta.path_lower,direct_only:true})});if(list.ok){const j=await list.json();if(j.links&&j.links.length>0)sres=j.links[0];}}else{const t=await make.text();throw new Error('Shared link error '+t);}}
let url=(sres&&sres.url)?sres.url:'';
if(url.includes('?dl=0'))url=url.replace('?dl=0','?dl=1');
else if(!url.includes('?dl='))url=url+'?dl=1';
return{url,path:meta.path_lower};
}