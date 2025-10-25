<div id="console-panel" style="
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #333;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.5);
  font-size: 12px;
">
  <div id="console-header" style="
    padding: 8px;
    background: #2d2d30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
  ">
    <span>Debug Console</span>
    <div>
      <button id="clear-console" style="margin-right: 10px; background: #404040; color: white; border: none; padding: 3px 8px;">Clear</button>
      <button id="toggle-console" style="background: #404040; color: white; border: none; padding: 3px 8px;">Hide</button>
    </div>
  </div>
  <div id="console-content" style="
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  "></div>
</div>

<script>
  (function() {
    // Ensure no conflicts
    if (window.consolePanelInitialized) return;
    window.consolePanelInitialized = true;

    const panel = document.getElementById('console-panel');
    const content = document.getElementById('console-content');
    const clearBtn = document.getElementById('clear-console');
    const toggleBtn = document.getElementById('toggle-console');
    let isVisible = true;

    // Isolated log function
    window.log = function(message, type = 'log') {
      const entry = document.createElement('div');
      entry.style.padding = '2px 0';
      entry.style.borderBottom = '1px solid #333';
      
      const timestamp = new Date().toLocaleTimeString();
      const typeStyle = {
        log: 'color: #d4d4d4;',
        info: 'color: #6796e6;',
        success: 'color: #89d185;',
        warning: 'color: #e2c08d;',
        error: 'color: #f48771;'
      }[type] || typeStyle.log;

      entry.innerHTML = `<span style="${typeStyle}">[${timestamp}] ${type.toUpperCase()}: </span>${message}`;
      content.appendChild(entry);
      content.scrollTop = content.scrollHeight;
    };

    // Override native console
    const originalLog = console.log;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = function(...args) {
      originalLog.apply(console, args);
      window.log(args.join(' '), 'log');
    };
    
    console.info = function(...args) {
      originalInfo.apply(console, args);
      window.log(args.join(' '), 'info');
    };
    
    console.warn = function(...args) {
      originalWarn.apply(console, args);
      window.log(args.join(' '), 'warning');
    };
    
    console.error = function(...args) {
      originalError.apply(console, args);
      window.log(args.join(' '), 'error');
    };

    // Event listeners
    clearBtn.onclick = () => content.innerHTML = '';
    toggleBtn.onclick = () => {
      isVisible = !isVisible;
      panel.style.display = isVisible ? 'flex' : 'none';
      toggleBtn.textContent = isVisible ? 'Hide' : 'Show';
    };
  })();
</script>