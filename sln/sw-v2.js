const CACHE_NAME = "sln-cache-v1";
const urlsToCache = [
  "/sln/",
  "/sln/sIn_chat.html",
  "/sln/sIn_chat_interface.html",
  "/sln/manifest.json",
  "/sln/android-chrome-192x192.png",
  "/sln/android-chrome-512x512.png",
  "/sln/apple-touch-icon.png",
  "/sln/favicon-16x16.png",
  "/sln/favicon-32x32.png",
  "/sln/favicon.ico"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching files");
      return cache.addAll(urlsToCache);
    }).catch(err => {
      console.error("[SW] Cache addAll failed", err);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(err => {
          console.warn("[SW] Network fetch failed:", err);
        });
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(err => {
        console.error("[SW] Final fetch failed:", err);
        // Optionally return fallback HTML page
        // return caches.match('/sln/offline.html');
      });
    })
  );
});
