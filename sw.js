/* Service worker mínimo: permite instalar la app. No guarda nada en caché, así las actualizaciones se ven siempre. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
