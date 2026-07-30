const CACHE_NAME = 'codelab-cache-v6';
const PRECACHE_URLS = [
  './',
  'index.html',
  'privacy.html',
  'favicon.svg',
  'manifest.json',
  'css/style.css',
  'js/utils.js',
  'js/data/python.js',
  'js/data/javascript.js',
  'js/data/typescript.js',
  'js/data/webpage.js',
  'js/data/java.js',
  'js/data/kotlin.js',
  'js/data/c.js',
  'js/data/unity.js',
  'js/data/sql.js',
  'js/data/go.js',
  'js/data/php.js',
  'js/data/rust.js',
  'js/data/cpp.js',
  'js/data/csharp.js',
  'js/data/swift.js',
  'js/app.js',
  'js/minigames.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 정적 파일만 캐시 대상: 같은 출처 GET 요청만 다루고, sql.js/Pyodide 같은
   무거운 외부 CDN 요청은 그대로 브라우저 기본 동작에 맡겨요. */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res.ok) caches.open(CACHE_NAME).then(cache => cache.put(req, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
