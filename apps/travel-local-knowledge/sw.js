const CACHE = 'tee-local-knowledge-v3-3-52-simple-traveler-setup';
const CACHE_PREFIX = 'tee-local-knowledge-';
const ASSETS = ['./','./index.html','./styles.css','./app.js','./manifest.json','../../assets/icon.svg'];

async function refreshCache() {
  const cache = await caches.open(CACHE);
  for (const asset of ASSETS) {
    try {
      const req = new Request(asset, {cache:'reload'});
      const res = await fetch(req);
      if (res.ok) await cache.put(req, res.clone());
    } catch {}
  }
}

self.addEventListener('install', event => {
  event.waitUntil((async()=>{ await refreshCache(); await self.skipWaiting(); })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET')return;
  event.respondWith((async()=>{
    try {
      const fresh=await fetch(req,{cache:'no-store'});
      if(fresh && fresh.ok){const cache=await caches.open(CACHE);await cache.put(req,fresh.clone());}
      return fresh;
    } catch {
      return (await caches.match(req)) || Response.error();
    }
  })());
});
