var CACHE_NAME = "n3n-cache";
var REQUIRED_FILES = [
  "/",
  "/mizui.css",
  "/mizui.js",
  "/script.js",
  "/favicon.ico",
];

self.addEventListener("install", function (event) {
  // Put `offline.html` page into cache
  var offlineRequest = new Request("offline/index.html");
  event.waitUntil(cacheOffline(offlineRequest));

  // Perform install steps
  event.waitUntil(precache());
});

self.addEventListener("fetch", function (event) {
  // Only fall back for HTML documents.
  var request = event.request;
  // && request.headers.get('accept').includes('text/html')
  if (request.method === "GET") {
    // `fetch()` will use the cache when possible, to this examples
    // depends on cache-busting URL parameter to avoid the cache.
    event.respondWith(
      fetch(request)
        .catch(function (error) {
          // `fetch()` throws an exception when the server is unreachable but not
          // for valid HTTP responses, even `4xx` or `5xx` range.
          console.error(
            "[onfetch] Failed. Serving cached offline fallback " + error
          );
        })
        .then(fromCache(request))
        .finally(fetchOffline())
    );
  }
  // Any other handlers come here. Without calls to `event.respondWith()` the
  // request will be handled without the ServiceWorker.
  // event.respondWith(fromCache(event.request));
  event.waitUntil(update(request));
});

function precache() {
  return caches.open(CACHE_NAME).then(function (cache) {
    console.log("Using cache " + CACHE_NAME);
    return cache.addAll(REQUIRED_FILES);
  });
}

function cacheOffline(offlineRequest) {
  fetch(offlineRequest).then(function (response) {
    return caches.open("offline").then(function (cache) {
      console.log("[oninstall] Cached offline page", response.url);
      return cache.put(offlineRequest, response);
    });
  });
}

function fetchOffline() {
  return caches.open("offline").then(function (cache) {
    return cache.match("offline/index.html");
  });
}

function fromCache(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject("no-match");
    });
  });
}

function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
