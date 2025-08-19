// service-worker.js - SquadVertex PWA
const VERSION = 'v1.0.0'; // bump this on deploy to force clients to update
const PRECACHE = `precache-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;

const PRECACHE_URLS = [
  '/',                 // index
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/sw-register.js',
  // add other app shell files you always want cached:
  '/styles.css',
  '/app.js'
  // don't list large media here unless you want them cached immediately
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Remove old caches
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(k => k !== PRECACHE && k !== RUNTIME)
          .map(k => caches.delete(k))
      );
      // Take control immediately
      await self.clients.claim();
    })()
  );
});

// Utility: limit number of entries in a cache (simple)
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await trimCache(cacheName, maxItems);
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip cross-origin analytics or third-party by default (you can customize)
  if (url.origin !== location.origin) {
    // runtime caching for cross-origin images can be added if needed
    return;
  }

  // Navigation requests (SPA support) -> Network first, fallback to cache -> then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          // Keep a copy in runtime cache
          const cache = await caches.open(RUNTIME);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match('/offline.html');
          return offline;
        }
      })()
    );
    return;
  }

  // For static assets (CSS/JS/images) -> cache-first with runtime caching
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cachedResp => {
        if (cachedResp) return cachedResp;
        return fetch(request).then(networkResp => {
          return caches.open(RUNTIME).then(cache => {
            cache.put(request, networkResp.clone());
            // trim images cache to avoid storage bloat
            if (request.destination === 'image') {
              trimCache(RUNTIME, 60);
            }
            return networkResp;
          });
        }).catch(() => {
          // fallback for images when offline - optional: return a placeholder image
          if (request.destination === 'image') {
            return caches.match('/icons/icon-192.png');
          }
        });
      })
    );
    return;
  }

  // Default: try network, fallback to cache
  event.respondWith(
    fetch(request).then(resp => {
      // optionally cache some API responses
      return resp;
    }).catch(() => caches.match(request))
  );
});

// Listen for skipWaiting messages so we can activate update immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});