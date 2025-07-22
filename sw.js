// Service Worker for offline caching
const CACHE_NAME = 'hololive-card-tool-v3.13-force-cache-clear'; // 強制キャッシュクリア
const urlsToCache = [
  './',
  './index.html',
  './card_list.html',
  './holoca_skill_page.html',
  './deck_builder.html',
  './json_file/card_data.json',
  './json_file/release_dates.json',
  './images/placeholder.png',
  './images/TCG-ColorArtIcon-Blue.png',
  './images/TCG-ColorArtIcon-Colorless.png',
  './images/TCG-ColorArtIcon-Green.png',
  './images/TCG-ColorArtIcon-Purple.png',
  './images/TCG-ColorArtIcon-Red.png',
  './images/TCG-ColorArtIcon-White.png',
  './images/TCG-ColorArtIcon-Yellow.png',
  './images/TCG-ColorIcon-Blue.png',
  './images/TCG-ColorIcon-BlueRed.png',
  './images/TCG-ColorIcon-Colorless.png',
  './images/TCG-ColorIcon-Green.png',
  './images/TCG-ColorIcon-Purple.png',
  './images/TCG-ColorIcon-Red.png',
  './images/TCG-ColorIcon-White.png',
  './images/TCG-ColorIcon-WhiteGreen.png',
  './images/TCG-ColorIcon-Yellow.png',
  './images/tokkou_50_blue.png',
  './images/tokkou_50_green.png',
  './images/tokkou_50_purple.png',
  './images/tokkou_50_red.png',
  './images/tokkou_50_white.png',
  './images/tokkou_50_yellow.png'
];

// Install event - cache resources and immediately take control
self.addEventListener('install', (event) => {
  console.log('Service Worker installing... Force update mode');
  // 強制的に即座にスキップ待機
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache failed:', error);
      })
  );
});

// Listen for skip waiting message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Received SKIP_WAITING message, taking control');
    self.skipWaiting();
  }
});

// Activate event - clean up old caches and claim clients when skip waiting
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating... Clearing all old caches');
  event.waitUntil(
    Promise.all([
      // Delete all old caches aggressively
      caches.keys().then((cacheNames) => {
        console.log('Found caches:', cacheNames);
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Force deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Immediately claim all clients
      self.clients.claim().then(() => {
        console.log('Claimed all clients');
        // Notify all clients to reload
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'CACHE_UPDATED',
              message: 'New version available, please reload'
            });
          });
        });
      })
    ])
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and external URLs
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }

        // Fetch from network and cache the response
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              // Cache card images dynamically
              if (event.request.url.includes('hololive-official-cardgame.com/cardlist/image/') ||
                  event.request.url.includes('.jpg') ||
                  event.request.url.includes('.png')) {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        }).catch(() => {
          // If network fails, try to serve a cached placeholder for images
          if (event.request.destination === 'image') {
            return caches.match('./images/placeholder.png');
          }
        });
      })
  );
});

// Background sync for data updates when connection is restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(updateCache());
  }
});

// Function to update cache with latest data
async function updateCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      './json_file/card_data.json',
      './json_file/release_dates.json'
    ]);
    console.log('Cache updated with latest data');
  } catch (error) {
    console.log('Failed to update cache:', error);
  }
}
