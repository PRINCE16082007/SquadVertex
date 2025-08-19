// sw-register.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', { scope: './' });
      console.log('SW registered:', reg);

      // Listen for updates
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // new update available
              console.log('New service worker installed — update available');
              // Dispatch a custom event so your app can prompt the user
              window.dispatchEvent(new Event('sw-update-available'));
            } else {
              // first install
              console.log('Service worker installed for the first time');
            }
          }
        });
      });

      // Optional: force activation on user action by posting message to SW
      window.addEventListener('sw-update-apply', async () => {
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          // reload clients after activation
          reg.waiting.addEventListener('statechange', (e) => {
            if (e.target.state === 'activated') {
              window.location.reload();
            }
          });
        }
      });
    } catch (err) {
      console.error('SW registration failed:', err);
    }
  });
}