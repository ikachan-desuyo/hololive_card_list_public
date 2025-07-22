// Service Worker for offline caching with centralized version management
const APP_VERSION = '4.3.1';
const VERSION_DESCRIPTION = 'バインダーコレクション管理システム - ドラッグ&ドロップ機能完全実装';

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  'index.html': '4.2.0-BINDER-COLLECTION-UPDATE',  // バインダーコレクション管理システム追加
  'card_list.html': '4.1.0-CSV-ENHANCEMENT',  // CSV機能改良 - ファイル保存/読み込み対応
  'collection_binder.html': '4.3.1-DRAG-DROP-COMPLETE',  // ドラッグ&ドロップ機能完全実装
  'binder_collection.html': '4.1.0-BINDER-COLLECTION',  // 複数バインダー管理システム
  'holoca_skill_page.html': '4.0.0-CENTRALIZED-VERSION',  // バージョン表示統一とUI改善
  'deck_builder.html': '4.0.0-CENTRALIZED-VERSION'  // バージョン表示統一とフィルター機能改善
};

// ✅ 更新内容の詳細情報
const UPDATE_DETAILS = {
  title: '🚀 メジャーアップデート v4.3.1',
  description: 'バインダーコレクション管理システムに完全なドラッグ&ドロップ機能を実装しました',
  changes: [
    '🖱️ 完全なドラッグ&ドロップ機能実装（カード移動・入れ替え対応）',
    '✨ ドラッグ時の視覚エフェクト追加（回転・拡大縮小・光るエフェクト）',
    '🎯 自動配置で二次ソート機能追加（カード番号順・発売日順・名前順・収録商品順）',
    '✨ Sレアリティカードに光エフェクト追加',
    '📦 空スロット保持機能（持っていないカードは空スロットで配置）',
    '🎨 ダークモード対応強化',
    '📚 複数バインダー管理システム（v4.2.0から継続）',
    '🖼️ バインダーごとのカスタム表紙画像設定',
    '📝 バインダー名前・説明のカスタマイズ',
    '📱 モバイル最適化されたバインダー管理UI',
    '💾 バインダーごとの独立したデータ保存システム'
  ]
};

const CACHE_NAME = `hololive-card-tool-v${APP_VERSION}-${VERSION_DESCRIPTION.replace(/\s+/g, '-')}`;
const urlsToCache = [
  './',
  './index.html',
  './card_list.html',
  './collection_binder.html',
  './binder_collection.html',
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

// ✅ バージョン比較機能
function compareVersions(current, cached) {
  if (!cached) return true; // キャッシュされていない場合は更新が必要
  
  const currentParts = current.split('.').map(n => parseInt(n, 10));
  const cachedParts = cached.split('.').map(n => parseInt(n, 10));
  
  for (let i = 0; i < Math.max(currentParts.length, cachedParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const cachedPart = cachedParts[i] || 0;
    
    if (currentPart > cachedPart) return true;
    if (currentPart < cachedPart) return false;
  }
  
  return false; // 同じバージョン
}

// ✅ バージョン情報を取得する機能
async function getVersionInfo() {
  return {
    appVersion: APP_VERSION,
    pageVersions: PAGE_VERSIONS,
    updateDetails: UPDATE_DETAILS,
    versionDescription: VERSION_DESCRIPTION,
    cacheName: CACHE_NAME
  };
}

// ✅ バージョン情報をコンソールに表示
function logVersionInfo() {
  console.log(`%c🚀 Hololive Card Tool Service Worker v${APP_VERSION}`, 'color: #4CAF50; font-weight: bold; font-size: 16px;');
  console.log(`%c📝 ${VERSION_DESCRIPTION}`, 'color: #2196F3; font-weight: bold;');
  console.log('%c📚 ページバージョン情報:', 'color: #FF9800; font-weight: bold;');
  Object.entries(PAGE_VERSIONS).forEach(([page, version]) => {
    console.log(`  • ${page}: %c${version}`, 'color: #4CAF50;');
  });
  console.log(`%c🗂️ キャッシュ名: ${CACHE_NAME}`, 'color: #9C27B0;');
}

// Install event
self.addEventListener('install', function(event) {
  console.log('%c⚡ Service Worker: Install Event', 'color: #4CAF50; font-weight: bold;');
  logVersionInfo();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('%c📦 Service Worker: Caching files...', 'color: #2196F3;');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('%c✅ Service Worker: All files cached successfully', 'color: #4CAF50;');
        return self.skipWaiting();
      })
      .catch(function(error) {
        console.error('❌ Service Worker: Caching failed:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  console.log('%c🔄 Service Worker: Activate Event', 'color: #FF9800; font-weight: bold;');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('%c🗑️ Service Worker: Deleting old cache:', cacheName, 'color: #F44336;');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('%c✅ Service Worker: Activated', 'color: #4CAF50;');
      return self.clients.claim();
    })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  // ログを減らすために、HTMLファイルのリクエストのみログ出力
  if (event.request.url.endsWith('.html') || event.request.url.endsWith('/')) {
    console.log('%c🌐 Service Worker: Fetching', event.request.url, 'color: #607D8B;');
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュにあればそれを返す
        if (response) {
          return response;
        }
        
        // キャッシュになければネットワークから取得
        return fetch(event.request).then(function(response) {
          // 有効なレスポンスかチェック
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // レスポンスをクローンしてキャッシュに保存
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(function(error) {
        console.error('❌ Service Worker: Fetch failed:', error);
        
        // HTMLページの場合はオフライン用のフォールバック
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

// Message event - バージョン情報を要求された場合
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'GET_VERSION_INFO') {
    event.ports[0].postMessage(getVersionInfo());
  }
});

// ✅ エラーハンドリング
self.addEventListener('error', function(event) {
  console.error('❌ Service Worker Error:', event.error);
});

self.addEventListener('unhandledrejection', function(event) {
  console.error('❌ Service Worker Unhandled Rejection:', event.reason);
});

// ✅ 初期化完了メッセージ
console.log('%c🎉 Hololive Card Tool Service Worker initialized successfully!', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
