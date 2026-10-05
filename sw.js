/**
 * Service Worker - AnimVC: A Jornada do Fundador
 * Fornece funcionamento offline e cache rápido
 */

const CACHE_NAME = 'animvc-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/components.css',
  './css/animations.css',
  './js/capTableEngine.js',
  './js/characters.js',
  './js/macroCards.js',
  './js/termSheet.js',
  './js/jCurveEngine.js',
  './js/roundsData.js',
  './js/audioEffects.js',
  './js/gameState.js',
  './js/ui.js',
  './js/app.js',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Cacheando assets do AnimVC...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🧹 Limpando cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Fallback para index.html se for navegação
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
