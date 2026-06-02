const CACHE_NAME = 'it-support-quiz-v9';
const ASSETS_TO_CACHE = [
  '/IT-Support-Quizes-11-and-12/',
  '/IT-Support-Quizes-11-and-12/index.html',
  '/IT-Support-Quizes-11-and-12/cover.png',
  '/IT-Support-Quizes-11-and-12/manifest.json',
  '/IT-Support-Quizes-11-and-12/sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
