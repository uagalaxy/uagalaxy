        // This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "uagalaxy";
// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = [
    '/index.html',
'/auworld/css/app.css',
'/auworld/css/responsive.css',
'/auworld/css/style.css',
'/auworld/css/theme.css',
'/auworld/js/firebase.js',
'/auworld/js/functions.js',
'/auworld/js/jquery.min.js',
'/auworld/js/like-firebase.js',
'/auworld/js/list.min.js',
'/auworld/js/login.js',
'/auworld/js/particles.min.js',
'/auworld/js/post.js',
'/auworld/js/script.js',
'/auworld/js/service-worker.js',
'/auworld/js/after.js',
'/auworld/js/app.js',
'/auworld/js/cursor.js',
'/auworld/js/data.js',
 
]

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(offlineFallbackPage))
  );
});


if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      if (event.request.url.endsWith('last-updated')) {
        console.log(event.request.url);
        console.log(await caches.match(event.request.url));
        return (await caches.match(event.request.url)) || new Response('Never');
      }
      try {
        const response = await event.preloadResponse;
        if (response) {
          return response;
        }
        return fetch(event.request);
      } catch {
        return new Response('Offline');
      }
    })()
  );
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      (async () => {
        // Sync new data in the background and store it.
        const lastUpdated = await updateContent();
        const backgroundSyncCache = await caches.open(
          'periodic-background-sync'
        );
        backgroundSyncCache.put('/last-updated', new Response(lastUpdated));

        // Notify potentially running clients, so they can update.
        self.clients.matchAll().then((clientList) => {
          for (const client of clientList) {
            client.postMessage({
              tag: event.tag,
            });
          }
        });
      })()
    );
  }
});

const registration = await navigator.serviceWorker.ready;
if ('periodicSync' in registration) {
  try {
    await registration.periodicSync.register('content-sync', {
      // An interval of one day.
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    // Periodic background sync cannot be used.
  }
}
