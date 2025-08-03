//if using this code snippet directly into main code, then please keep it in head section within a script tag.
<!-- Floating Draggable Debug Window — paste this just before </body> -->
<script>
(function(){
  // Wait until <body> exists
  function init() {
    // 🏗️ Create panel
    const panel = document.createElement('div');
    Object.assign(panel.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '320px',
      height: '240px',
      background: 'rgba(0,0,0,0.85)',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: '12px',
      overflowY: 'auto',
      borderRadius: '8px',
      padding: '8px',
      zIndex: '999999',
      boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
      resize: 'both',
    });
    document.body.appendChild(panel);

    // 🔲 Header for dragging
    const header = document.createElement('div');
    header.textContent = '🔍 DEBUG';
    Object.assign(header.style, {
      cursor: 'move',
      background: '#111',
      padding: '4px',
      borderRadius: '6px 6px 0 0',
      fontWeight: 'bold',
      textAlign: 'center',
    });
    panel.prepend(header);

    // 🖱️ Make draggable
    (function makeDraggable(el, handle){
      let dx=0, dy=0, dragging=false;
      handle.addEventListener('mousedown', e => {
        dragging = true;
        dx = e.clientX - el.offsetLeft;
        dy = e.clientY - el.offsetTop;
        document.body.style.userSelect = 'none';
      });
      document.addEventListener('mousemove', e => {
        if (!dragging) return;
        el.style.left = (e.clientX - dx) + 'px';
        el.style.top  = (e.clientY - dy) + 'px';
        el.style.bottom = 'auto';
        el.style.right = 'auto';
      });
      document.addEventListener('mouseup', () => {
        dragging = false;
        document.body.style.userSelect = '';
      });
    })(panel, header);

    // 🔘 Toggle button
    const btn = document.createElement('button');
    btn.textContent = '🐞';
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '20px',
      right: '360px',
      background: '#222',
      color: '#0f0',
      border: 'none',
      borderRadius: '4px',
      padding: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      zIndex: '1000000',
    });
    btn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    document.body.appendChild(btn);

    // 📦 Original console
    const orig = { ...console };
    const levels = ['log','info','warn','error','debug'];

    // 📝 Write to panel
    function write(level, args) {
      const ts = new Date().toISOString();
      const txt = args.map(a =>
        typeof a === 'object' ? JSON.stringify(a) : a
      ).join(' ');
      const line = document.createElement('div');
      line.textContent = `[${ts}] [${level.toUpperCase()}] ${txt}`;
      if (level==='error') line.style.color='#f55';
      if (level==='warn')  line.style.color='#ff5';
      panel.appendChild(line);
      panel.scrollTop = panel.scrollHeight;
    }

    // 🔄 Override console
    levels.forEach(lvl => {
      console[lvl] = (...args) => {
        orig[lvl](...args);
        write(lvl, args);
      };
    });

    // 🌪️ Catch errors
    window.addEventListener('error', e => {
      console.error(`Uncaught Error: "${e.message}" at ${e.filename}:${e.lineno}:${e.colno}`);
    });
    window.addEventListener('unhandledrejection', e => {
      console.error('Unhandled Promise Rejection:', e.reason);
    });
  }

  // If body ready, init; else wait
  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else init();
})();
</script>