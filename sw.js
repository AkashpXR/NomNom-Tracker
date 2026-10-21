// Offline support: the app's own files load from the network first (so updates show up straight away)
// and fall back to the cache offline. Firebase SDK files and fonts are versioned, so they come from cache.
// Firestore, sign-in and Gemini requests are never cached.
const CACHE = 'nomnom-v1';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const own = url.origin === self.location.origin;
  const pinned = (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/'))
    || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!own && !pinned) return;

  if (own){
    e.respondWith(fetch(req).then(res => {
      if (res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    return res;
  })));
});
