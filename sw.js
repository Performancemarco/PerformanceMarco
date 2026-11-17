/* Service worker mínimo: permite instalar la app. No guarda nada en caché, así las actualizaciones se ven siempre. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
/* Notificaciones push: recordatorios de bienestar, sesión y calendario */
self.addEventListener('push', e => {
 let d = {}; try { d = e.data ? e.data.json() : {}; } catch (_) { d = {body: e.data ? e.data.text() : ''}; }
 e.waitUntil(self.registration.showNotification(d.title || 'Performancemarco', {body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || 'pm', renotify: true, data: {url: d.url || './'}}));
});
self.addEventListener('notificationclick', e => {
 e.notification.close(); const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
 e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => { for (const c of list) if ('focus' in c) { if ('navigate' in c) c.navigate(url); return c.focus(); } return self.clients.openWindow(url); }));
});
