const CACHE_NAME = "sln-cache-v1";
const CACHE_TIMEOUT = 3600 * 1000; // 1 hour
let lastUpdate = Date.now();

const urlsToCache = [
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

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const now = Date.now();
  const shouldUpdate = (now - lastUpdate) > CACHE_TIMEOUT;

  if (shouldUpdate) {
    lastUpdate = now;
    event.respondWith(
      fetch(event.request).then(res => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, res.clone());
          return res;
        });
      }).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(res => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, res.clone());
            return res;
          });
        });
      })
    );
  }
});