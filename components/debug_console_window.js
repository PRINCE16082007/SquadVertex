//if using this code snippet directly into main code, then please keep it in head section within a script tag.
(function(){
  function initDebugConsole() {
    // create the debug container
    const dbg = document.createElement('div');
    Object.assign(dbg.style, {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      width: '280px',
      maxHeight: '45vh',
      background: 'rgba(0, 0, 0, 0.95)',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: '12px',
      lineHeight: '1.2',
      padding: '10px',
      overflowY: 'auto',
      zIndex: 2147483647,    // max z-index
      border: '2px solid #0f0',
      borderRadius: '6px',
      cursor: 'move'
    });
    dbg.id = 'mobile-debug-console';
    document.body.appendChild(dbg);

    // make it draggable
    let isDown = false, startX, startY, origX, origY;
    dbg.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
      origX = parseInt(dbg.style.right);
      origY = parseInt(dbg.style.bottom);
      e.preventDefault();
    });
    document.addEventListener('mouseup', () => isDown = false);
    document.addEventListener('mousemove', e => {
      if (!isDown) return;
      const dx = startX - e.clientX;
      const dy = e.clientY - startY;
      dbg.style.right = (origX + dx) + 'px';
      dbg.style.bottom = (origY + dy) + 'px';
    });

    // utility to append messages
    function logToWindow(type, args) {
      const msg = document.createElement('div');
      msg.textContent = '[' + type.toUpperCase() + '] ' + Array.from(args).map(a => {
        try { return typeof a==='object' ? JSON.stringify(a) : a; }
        catch { return a; }
      }).join(' ');
      dbg.appendChild(msg);
      dbg.scrollTop = dbg.scrollHeight;
    }

    // override console methods
    ['log','info','warn','error','debug'].forEach(fn => {
      const orig = console[fn].bind(console);
      console[fn] = function(...args) {
        orig(...args);
        logToWindow(fn, args);
      };
    });

    // catch uncaught errors
    window.addEventListener('error', e => {
      console.error('UncaughtError:', e.message, 'at', e.filename + ':' + e.lineno);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDebugConsole);
  } else {
    initDebugConsole();
  }
})();