// Service Worker Install Event
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting(); // Force new service worker to take control
});

// Activate Event: Purana Cache Delete Karega
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => caches.delete(cache))
            );
        })
    );
});

// Fetch Event (Agar Future Me Cache Add Karna Ho)
self.addEventListener("fetch", (event) => {
    console.log("Fetching:", event.request.url);
});