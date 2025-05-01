const CACHE_NAME = 'sv-tracker-v1';
const URLS = [
  '/schedule_tracker/girls_schedule_tracker/girls_schedule_tracker.html',
  '/schedule_tracker/girls_schedule_tracker/manifest.json',
  '/schedule_tracker/girls_schedule_tracker/android-chrome-192x192.png',
  '/schedule_tracker/girls_schedule_tracker/android-chrome-512x512.png',
  // add your CSS/JS assets here
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});