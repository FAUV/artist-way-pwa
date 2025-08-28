self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => clients.claim());
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.pathname.startsWith('/api')) {
    e.respondWith((async () => {
      try { return await fetch(e.request); }
      catch { return new Response(JSON.stringify({ ok:false, offline:true }), { headers:{ 'Content-Type':'application/json' } }); }
    })());
    return;
  }
  e.respondWith(
    caches.open('static').then(cache => cache.match(e.request)).then(res => res || fetch(e.request))
  );
});
