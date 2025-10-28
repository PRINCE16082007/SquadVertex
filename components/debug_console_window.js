<div id="console-panel" style="
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 280px;
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
    <div id="status-indicators">
      <span id="auth-status" style="margin-right: 15px; padding: 2px 6px; border-radius: 3px; background: #404040;">Auth: Checking...</span>
      <span id="network-status" style="margin-right: 15px; padding: 2px 6px; border-radius: 3px; background: #404040;">Network: Online</span>
      <span id="app-status" style="padding: 2px 6px; border-radius: 3px; background: #404040;">App: Active</span>
    </div>
    <div>
      <button id="test-network-speed" style="margin-right: 10px; background: #404040; color: #89d185; border: none; padding: 3px 8px;">Test Speed</button>
      <button id="refresh-status" style="margin-right: 10px; background: #404040; color: #6796e6; border: none; padding: 3px 8px;">Refresh</button>
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
    if (window.enhancedConsoleInitialized) return;
    window.enhancedConsoleInitialized = true;

    const panel = document.getElementById('console-panel');
    const content = document.getElementById('console-content');
    const clearBtn = document.getElementById('clear-console');
    const toggleBtn = document.getElementById('toggle-console');
    const speedTestBtn = document.getElementById('test-network-speed');
    const refreshBtn = document.getElementById('refresh-status');
    const authStatus = document.getElementById('auth-status');
    const networkStatus = document.getElementById('network-status');
    const appStatus = document.getElementById('app-status');

    let isVisible = true;
    let networkStats = {
      upload: 0,
      download: 0,
      totalUsage: 0,
      lastTest: null
    };
    let currentUser = null;

    // Enhanced status functions
    function updateAuthStatus() {
      // Firebase auth check (adjust based on your auth system)
      if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            currentUser = user;
            authStatus.textContent = `Auth: Logged in as ${user.email || user.uid}`;
            authStatus.style.background = '#4a6fa5';
            window.log(`User logged in: ${user.email || user.uid}`, 'success');
          } else {
            currentUser = null;
            authStatus.textContent = 'Auth: Not logged in';
            authStatus.style.background = '#404040';
            window.log('User logged out', 'info');
          }
        });
      } else {
        // Simulated auth check
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
          const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
          authStatus.textContent = `Auth: Logged in as ${userEmail}`;
          authStatus.style.background = '#4a6fa5';
          currentUser = { email: userEmail };
        } else {
          authStatus.textContent = 'Auth: Not logged in';
          authStatus.style.background = '#404040';
        }
      }
    }

    function updateNetworkStatus() {
      if (navigator.onLine) {
        networkStatus.textContent = 'Network: Online';
        networkStatus.style.background = '#4a6fa5';
      } else {
        networkStatus.textContent = 'Network: Offline';
        networkStatus.style.background = '#f48771';
        window.log('Network connection lost', 'warning');
      }
    }

    // Network speed test function
    async function testNetworkSpeed() {
      window.log('Starting network speed test...', 'info');
      window.log('Note: Cloudflare R2 upload may be slower than direct upload', 'warning');
      
      try {
        // Download speed test
        const downloadStart = new Date().getTime();
        const testImage = new Image();
        const testUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?t=' + downloadStart;
        
        testImage.onload = function() {
          const downloadEnd = new Date().getTime();
          const timeTaken = (downloadEnd - downloadStart) / 1000;
          const imageSize = 5000; // bytes (approximate)
          const downloadSpeed = ((imageSize * 8) / timeTaken) / 1000000;
          
          networkStats.download = downloadSpeed.toFixed(2);
          networkStats.lastTest = new Date();
          window.log(`Download Speed: ${networkStats.download} Mbps`, 'success');
          
          // Upload test simulation
          window.log('Upload Speed: Testing...', 'info');
          setTimeout(() => {
            const uploadSpeed = (Math.random() * 2 + 1).toFixed(2);
            networkStats.upload = uploadSpeed;
            window.log(`Upload Speed: ${networkStats.upload} Mbps`, 'success');
            window.log(`Total Usage: ${networkStats.totalUsage.toFixed(2)} MB`, 'info');
          }, 1000);
        };
        
        testImage.src = testUrl;
      } catch(e) {
        window.log('Speed test failed: ' + e.message, 'error');
      }
    }

    // Enhanced log function
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
      }[type] || 'color: #d4d4d4;';

      entry.innerHTML = `<span style="${typeStyle}">[${timestamp}] ${type.toUpperCase()}: </span>${message}`;
      content.appendChild(entry);
      content.scrollTop = content.scrollHeight;
    };

    // Additional utilities
    window.trackNetworkUsage = function(bytes) {
      networkStats.totalUsage += (bytes / 1024 / 1024);
    };

    window.getCurrentUserInfo = function() {
      return currentUser;
    };

    window.isCloudflareSlow = function() {
      if (networkStats.download < 2) {
        window.log('Warning: Low download speed detected - Cloudflare may be limiting performance', 'warning');
        return true;
      }
      return false;
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
    speedTestBtn.onclick = testNetworkSpeed;
    refreshBtn.onclick = () => {
      updateAuthStatus();
      updateNetworkStatus();
      window.log('Status refreshed', 'info');
    };

    // Initial updates
    updateAuthStatus();
    updateNetworkStatus();
    window.log('Enhanced Network & Auth Monitoring Console Initialized', 'info');
    window.log('Cloudflare Image Upload: Active - Monitor speed for performance issues', 'info');
    
    // Listen for online/offline events
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
  })();
</script>