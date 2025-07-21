// Service Worker for offline caching
const CACHE_NAME = 'hololive-card-tool-v2.6-mobile-layout'; // モバイルレイアウト修正
const urlsToCache = [
  './',
  './index.html',
  './card_list.html',
  './holoca_skill_page.html',
  './deck_builder.html',
  './json_file/card_data.json',
  './json_file/release_dates.json',
  './images/Logo_-_Hololive_Official_Card_Game.png',
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

// Install event - cache resources (removed skipWaiting to prevent loops)
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches more carefully
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
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
