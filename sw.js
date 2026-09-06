const CACHE_NAME = "kushinara-connect-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./places.html",
  "./hotels.html",
  "./cabs.html",
  "./packages.html",
  "./restaurants.html",
  "./businesses.html",
  "./blog.html",
  "./contact.html",
  "./manifest.json"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();

});


self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();

});


self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(cached => {

        return cached ||
          fetch(event.request).catch(() =>
            caches.match("./index.html")
          );

      })
  );

});
