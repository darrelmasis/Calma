const CACHE_NAME = 'calma-pwa-cache-v1';
const OFFLINE_URL = '/offline.html';

// Archivos esenciales a cachear
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/assets/css/main.css',
  '/assets/js/main.js',
  // Agrega aquí todos tus iconos, imágenes y archivos estáticos importantes
  '/icons/bg/icon-48.png',
  '/icons/bg/icon-72.png',
  '/icons/bg/icon-96.png',
  '/icons/bg/icon-144.png',
  '/icons/bg/icon-192.png',
  '/icons/bg/icon-512.png',
  '/icons/maskable/icon-maskable-48.png',
  '/icons/maskable/icon-maskable-72.png',
  '/icons/maskable/icon-maskable-96.png',
  '/icons/maskable/icon-maskable-144.png',
  '/icons/maskable/icon-maskable-192.png',
  '/icons/maskable/icon-maskable-512.png',
];

// Instalación y cache inicial
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Estrategia de fetch: Stale-While-Revalidate (cache y actualización en segundo plano)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse.clone();
        })
        .catch(() => cachedResponse || caches.match(OFFLINE_URL));

      return cachedResponse || fetchPromise;
    })
  );
});

// Background sync para formularios pendientes
self.addEventListener('sync', event => {
  if (event.tag === 'sync-reservas') {
    event.waitUntil(
      // Lógica para enviar formularios pendientes
      // Aquí se puede usar IndexedDB para almacenar los datos
      sendPendingReservations()
    );
  }
});

// Función ejemplo de envío de reservas pendientes
async function sendPendingReservations() {
  // Implementa tu lógica: recuperar del IndexedDB y enviar al API
  console.log('Enviando reservas pendientes...');
}

// Notificaciones push
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/maskable/icon-maskable-192.png',
    badge: '/icons/bg/icon-48.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Click en notificación
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
