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
 '/auworld/img/favicon.png',
'/auworld/img/feature-about.png',
'/auworld/img/feature-contact.png',
'/auworld/img/feature-post.png',
'/auworld/img/minions.jpg',
'/auworld/img/minions1.jpg',
'/auworld/img/minions2.jpg',
'/auworld/img/post-dp.png',
'/auworld/img/au.png',
        '/auworld/font/ua.ttf',
'/auworld/font/uaworld.TTF',
'/auworld/images/dilip-sir.jpeg',
'/auworld/images/homepage.png',
'/auworld/images/hritik.jpeg',
'/auworld/images/jadeja.jpeg',
'/auworld/images/mahi.jpeg',
'/auworld/images/minions.jpg',
'/auworld/pages/about.txt',
'/auworld/pages/contact.txt'
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

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
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

const registerPeriodicBackgroundSync = async (registration) => {
  const status = await navigator.permissions.query({
    name: 'periodic-background-sync',
  });
  if (status.state === 'granted' && 'periodicSync' in registration) {
    try {
      // Register the periodic background sync.
      await registration.periodicSync.register('content-sync', {
        // An interval of one day.
        minInterval: 24 * 60 * 60 * 1000,
      });
      available.hidden = false;
      notAvailable.hidden = true;

      // List registered periodic background sync tags.
      const tags = await registration.periodicSync.getTags();
      if (tags.length) {
        ul.innerHTML = '';
      }
      tags.forEach((tag) => {
        const li = document.createElement('li');
        li.textContent = tag;
        ul.append(li);
      });

      // Update the user interface with the last periodic background sync data.
      const backgroundSyncCache = await caches.open('periodic-background-sync');
      if (backgroundSyncCache) {
        const backgroundSyncResponse =
          backgroundSyncCache.match('/last-updated');
        if (backgroundSyncResponse) {
          lastUpdated.textContent = `${await fetch('/last-updated').then(
            (response) => response.text()
          )} (periodic background-sync)`;
        }
      }

      // Listen for incoming periodic background sync messages.
      navigator.serviceWorker.addEventListener('message', async (event) => {
        if (event.data.tag === 'content-sync') {
          lastUpdated.textContent = `${await updateContent()} (periodic background sync)`;
        }
      });
    } catch (err) {
      console.error(err.name, err.message);
      available.hidden = true;
      notAvailable.hidden = false;
      lastUpdated.textContent = 'Never';
    }
  } else {
    available.hidden = true;
    notAvailable.hidden = false;
    lastUpdated.textContent = `${await updateContent()} (manual)`;
  }
};
