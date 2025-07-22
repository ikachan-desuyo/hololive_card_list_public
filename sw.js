// Service Worker for offline caching with centralized version management
const APP_VERSION = '4.3.7';
const VERSION_DESCRIPTION = 'モバイルモーダル修正・商品フィルター・公式カード番号順追加';

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  'index.html': '4.2.0-BINDER-COLLECTION-UPDATE',  // バインダーコレクション管理システム追加
  'card_list.html': '4.1.1-CSV-ENHANCEMENT-UPDATE',  // CSV機能改良 - 追加修正と改善
  'collection_binder.html': '4.3.7-MOBILE-MODAL-FIX',  // モバイルモーダル修正・商品フィルター・公式カード番号順追加
  'binder_collection.html': '4.1.3-MOBILE-IMPROVEMENTS',  // 複数バインダー管理システム - UI改善と追加修正
  'holoca_skill_page.html': '4.0.0-CENTRALIZED-VERSION',  // バージョン表示統一とUI改善
  'deck_builder.html': '4.0.0-CENTRALIZED-VERSION'  // バージョン表示統一とフィルター機能改善
};

// ✅ 更新内容の詳細情報
const UPDATE_DETAILS = {
  title: '🚀 メジャーアップデート v4.3.7',
  description: 'モバイル版改善と新機能追加を行いました',
  changes: [
    '📱 モバイル版カード詳細モーダルのレイアウト改善',
    '�️ カード選択画面に収録商品フィルター追加',
    '🔧 モバイル版フィルター表示問題修正',
    '📋 公式カード番号順自動配置オプション追加',
    '�🎯 カード詳細モーダルにスキル情報表示機能追加',
    '🔀 デスクトップ版クロスページドラッグ&ドロップ機能追加',
    '🖼️ スキル情報表示でアイコン画像とスタイル改善',
    '📱 モバイル版UI大幅改善（タイトル横ボタン配置・歯車位置調整）',
    '🔍 閲覧モードでカード画像タップ拡大表示機能追加',
    '🎯 自動配置でエールカード最後尾配置対応',
    '✨ R以上のレアリティカードに光エフェクト追加',
    '📦 カード選択時の収録商品フィルター追加',
    '📐 モバイル版4×3レイアウト正常表示対応'
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

// ✅ ページバージョンをチェックする機能
async function checkPageVersions() {
  const outdatedPages = [];
  
  for (const [page, expectedVersion] of Object.entries(PAGE_VERSIONS)) {
    try {
      // ネットワークから最新のページを取得して比較
      const response = await fetch(`./${page}`, { cache: 'no-cache' });
      if (!response.ok) {
        outdatedPages.push({page, reason: 'fetch_failed', expectedVersion});
        continue;
      }
      
      const htmlText = await response.text();
      // より柔軟なバージョン検出：ヘッダーコメントと表示バージョンの両方をチェック
      const versionMatch = htmlText.match(/<!-- Version: ([\d\.]+-?[A-Z-]*)/);
      const displayVersionMatch = htmlText.match(/\[v([\d\.]+)-/);
      
      let actualVersion = null;
      if (versionMatch) {
        actualVersion = versionMatch[1]; // サフィックスを削除しない
      } else if (displayVersionMatch) {
        actualVersion = displayVersionMatch[1];
      }
      
      console.log(`Page ${page}: expected=${expectedVersion}, actual=${actualVersion}`);
      
      // キャッシュされたバージョンもチェック
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(`./${page}`);
      let cachedVersion = null;
      
      if (cachedResponse) {
        const cachedText = await cachedResponse.text();
        const cachedVersionMatch = cachedText.match(/<!-- Version: ([\d\.]+-?[A-Z-]*)/);
        const cachedDisplayVersionMatch = cachedText.match(/\[v([\d\.]+)-/);
        
        if (cachedVersionMatch) {
          cachedVersion = cachedVersionMatch[1]; // サフィックスを削除しない
        } else if (cachedDisplayVersionMatch) {
          cachedVersion = cachedDisplayVersionMatch[1];
        }
      }
      
      console.log(`Page ${page}: expected=${expectedVersion}, actual=${actualVersion}, cached=${cachedVersion}`);
      
      // 詳細なバージョン比較とミスマッチの理由を判定
      let mismatchReason = null;
      let needsUpdate = false;
      
      if (!actualVersion) {
        mismatchReason = 'actual_version_not_found';
        needsUpdate = true;
      } else if (compareVersions(expectedVersion, actualVersion)) {
        mismatchReason = 'expected_vs_actual_mismatch';
        needsUpdate = true;
      } else if (cachedVersion && compareVersions(actualVersion, cachedVersion)) {
        mismatchReason = 'actual_vs_cached_mismatch';
        needsUpdate = true;
      }
      // キャッシュにバージョン情報がない場合は更新しない
      
      if (needsUpdate) {
        outdatedPages.push({
          page, 
          reason: mismatchReason || 'version_mismatch', 
          expectedVersion, 
          actualVersion, 
          cachedVersion,
          details: {
            expectedVersion,
            actualVersion: actualVersion || 'unknown',
            cachedVersion: cachedVersion || 'none',
            mismatchType: mismatchReason
          }
        });
      }
    } catch (error) {
      console.error(`Error checking version for ${page}:`, error);
      outdatedPages.push({page, reason: 'error', expectedVersion});
    }
  }
  
  return outdatedPages;
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
  
  // 強制的に即座にスキップ待機
  self.skipWaiting();
  
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
    Promise.all([
      // Delete old caches and create fresh cache
      caches.keys().then(function(cacheNames) {
        console.log('Found caches:', cacheNames);
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log('%c🗑️ Service Worker: Deleting old cache:', cacheName, 'color: #F44336;');
              return caches.delete(cacheName);
            }
          })
        );
      }).then(function() {
        // Recreate cache with fresh content for HTML files
        return caches.open(CACHE_NAME).then(cache => {
          console.log('Updating cache with fresh HTML content:', CACHE_NAME);
          const cacheBustingUrls = urlsToCache.map(url => {
            if (url.endsWith('.html') || url === './') {
              return `${url}?v=${APP_VERSION}&t=${Date.now()}`;
            }
            return url;
          });
          return cache.addAll(cacheBustingUrls);
        });
      }),
      // Immediately claim all clients
      self.clients.claim().then(function() {
        console.log('%c✅ Service Worker: Activated and claimed clients', 'color: #4CAF50;');
        // Notify all clients about cache update
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'CACHE_UPDATED',
              message: 'Service Worker updated with drag & drop features',
              version: APP_VERSION,
              timestamp: Date.now()
            });
          });
        });
      })
    ])
  );
});

// Fetch event - Network First for HTML, Cache First for other resources
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests and external URLs
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // HTMLファイルに対してはNetwork First戦略を使用
  const isHTMLFile = event.request.url.endsWith('.html') || 
                     event.request.url === self.location.origin + '/' ||
                     event.request.url.endsWith('/');

  if (isHTMLFile) {
    // ログを減らすために、HTMLファイルのリクエストのみログ出力
    console.log('%c🌐 Service Worker: Fetching HTML with Network First', event.request.url, 'color: #607D8B;');
    
    event.respondWith(
      // Network First: まずネットワークから取得を試行（キャッシュバスティング付き）
      fetch(event.request.url + (event.request.url.includes('?') ? '&' : '?') + 't=' + Date.now(), {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
        .then(function(response) {
          if (response && response.status === 200) {
            // ネットワークから取得成功時はキャッシュを更新
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            console.log('Serving fresh HTML from network:', event.request.url);
            return response;
          }
          throw new Error('Network response not ok');
        })
        .catch(function() {
          // ネットワーク失敗時はキャッシュから提供
          console.log('Network failed, serving HTML from cache:', event.request.url);
          return caches.match(event.request);
        })
    );
  } else {
    // その他のリソースはCache First戦略
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
                // カード画像を動的にキャッシュ
                if (event.request.url.includes('hololive-official-cardgame.com/cardlist/image/') ||
                    event.request.url.includes('.jpg') ||
                    event.request.url.includes('.png')) {
                  cache.put(event.request, responseToCache);
                }
              });
            
            return response;
          }).catch(function() {
            // ネットワーク失敗時、画像の場合はプレースホルダーを提供
            if (event.request.destination === 'image') {
              return caches.match('./images/placeholder.png');
            }
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
  }
});

// Message event - 詳細なメッセージハンドリング
self.addEventListener('message', async function(event) {
  const { type, data } = event.data || {};
  
  switch (type) {
    case 'SKIP_WAITING':
      console.log('Received SKIP_WAITING message, taking control');
      self.skipWaiting();
      break;
      
    case 'FORCE_UPDATE':
      console.log('Received FORCE_UPDATE message, clearing all caches and forcing update');
      // 全キャッシュを強制削除
      const allCacheNames = await caches.keys();
      await Promise.all(allCacheNames.map(cacheName => caches.delete(cacheName)));
      console.log('All caches cleared for force update');
      // 新しいキャッシュを作成
      const newCache = await caches.open(CACHE_NAME);
      await newCache.addAll(urlsToCache);
      console.log('New cache created:', CACHE_NAME);
      self.skipWaiting();
      break;
      
    case 'GET_VERSION_INFO':
      // バージョン情報を返す
      const versionInfo = await getVersionInfo();
      event.ports[0]?.postMessage({
        type: 'VERSION_INFO_RESPONSE',
        data: versionInfo
      });
      break;
      
    case 'CHECK_OUTDATED_PAGES':
      // 古いページをチェック
      console.log('Checking outdated pages...');
      const outdatedPages = await checkPageVersions();
      console.log('Outdated pages result:', outdatedPages);
      event.ports[0]?.postMessage({
        type: 'OUTDATED_PAGES_RESPONSE',
        data: outdatedPages
      });
      break;
      
    case 'GET_UPDATE_MESSAGE':
      // 更新メッセージを生成
      const message = `${UPDATE_DETAILS.title}\n\n${UPDATE_DETAILS.description}\n\n` +
        UPDATE_DETAILS.changes.join('\n') + '\n\nページを更新しますか？';
      event.ports[0]?.postMessage({
        type: 'UPDATE_MESSAGE_RESPONSE',
        data: { message, details: UPDATE_DETAILS }
      });
      break;
      
    case 'CHECK_VERSION_MISMATCH':
      // 詳細なバージョンチェック
      console.log('Performing detailed version mismatch check...');
      try {
        const versionCheckResult = await checkPageVersions();
        
        // 全ページ情報を収集
        const allPages = [];
        for (const [page, expectedVersion] of Object.entries(PAGE_VERSIONS)) {
          try {
            const response = await fetch(`./${page}`, { cache: 'no-cache' });
            let actualVersion = expectedVersion; // デフォルトは期待バージョン
            
            if (response.ok) {
              const htmlText = await response.text();
              const versionMatch = htmlText.match(/<!-- Version: ([\d\.]+-?[A-Z-]*)/);
              const displayVersionMatch = htmlText.match(/\[v([\d\.]+)-/);
              
              if (versionMatch) {
                actualVersion = versionMatch[1];
              } else if (displayVersionMatch) {
                actualVersion = displayVersionMatch[1];
              }
            }
            
            allPages.push({
              page,
              expectedVersion,
              actualVersion
            });
          } catch (error) {
            console.error(`Error checking ${page}:`, error);
            allPages.push({
              page,
              expectedVersion,
              actualVersion: 'error'
            });
          }
        }
        
        const detailedInfo = {
          hasUpdates: versionCheckResult.length > 0,
          outdatedPages: versionCheckResult,
          allPages: allPages,
          currentAppVersion: APP_VERSION,
          pageVersions: PAGE_VERSIONS,
          timestamp: new Date().toISOString()
        };
        
        event.ports[0]?.postMessage({
          type: 'VERSION_MISMATCH_RESPONSE',
          data: detailedInfo
        });
      } catch (error) {
        console.error('Version check error:', error);
        event.ports[0]?.postMessage({
          type: 'VERSION_MISMATCH_ERROR',
          error: error.message
        });
      }
      break;
      
    case 'CHECK_SINGLE_PAGE_VERSION':
      // 単一ページのバージョンチェック
      console.log('Performing single page version check for:', data?.page);
      try {
        const targetPage = data?.page;
        if (!targetPage || !PAGE_VERSIONS[targetPage]) {
          throw new Error(`Invalid page: ${targetPage}`);
        }
        
        const expectedVersion = PAGE_VERSIONS[targetPage];
        let pageInfo = null;
        
        // ネットワークから最新のページを取得
        const response = await fetch(`./${targetPage}`, { cache: 'no-cache' });
        if (!response.ok) {
          pageInfo = {
            page: targetPage,
            reason: 'fetch_failed',
            expectedVersion,
            actualVersion: null,
            cachedVersion: null
          };
        } else {
          const htmlText = await response.text();
          // より柔軟なバージョン検出
          const versionMatch = htmlText.match(/<!-- Version: ([\d\.]+-?[A-Z-]*)/);
          const displayVersionMatch = htmlText.match(/\[v([\d\.]+)-/);
          
          let actualVersion = null;
          if (versionMatch) {
            actualVersion = versionMatch[1]; // サフィックスを削除しない
          } else if (displayVersionMatch) {
            actualVersion = displayVersionMatch[1];
          }
          
          // キャッシュされたバージョンもチェック
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(`./${targetPage}`);
          let cachedVersion = null;
          
          if (cachedResponse) {
            const cachedText = await cachedResponse.text();
            const cachedVersionMatch = cachedText.match(/<!-- Version: ([\d\.]+-?[A-Z-]*)/);
            const cachedDisplayVersionMatch = cachedText.match(/\[v([\d\.]+)-/);
            
            if (cachedVersionMatch) {
              cachedVersion = cachedVersionMatch[1]; // サフィックスを削除しない
            } else if (cachedDisplayVersionMatch) {
              cachedVersion = cachedDisplayVersionMatch[1];
            }
          }
          
          console.log(`Single page ${targetPage}: expected=${expectedVersion}, actual=${actualVersion}, cached=${cachedVersion}`);
          
          // バージョン比較とミスマッチの理由を判定
          let mismatchReason = null;
          let needsUpdate = false;
          
          if (!actualVersion) {
            mismatchReason = 'actual_version_not_found';
            needsUpdate = true;
          } else if (compareVersions(expectedVersion, actualVersion)) {
            mismatchReason = 'expected_vs_actual_mismatch';
            needsUpdate = true;
          } else if (cachedVersion && compareVersions(actualVersion, cachedVersion)) {
            mismatchReason = 'actual_vs_cached_mismatch';
            needsUpdate = true;
          }
          // キャッシュにバージョン情報がない場合は更新しない
          
          if (needsUpdate) {
            pageInfo = {
              page: targetPage,
              reason: mismatchReason || 'version_mismatch',
              expectedVersion,
              actualVersion,
              cachedVersion,
              details: {
                expectedVersion,
                actualVersion: actualVersion || 'unknown',
                cachedVersion: cachedVersion || 'none',
                mismatchType: mismatchReason
              }
            };
          }
        }
        
        const singlePageResult = {
          hasUpdates: pageInfo !== null,
          pageInfo: pageInfo,
          currentAppVersion: APP_VERSION,
          targetPage: targetPage,
          expectedVersion: expectedVersion,
          timestamp: new Date().toISOString()
        };
        
        event.ports[0]?.postMessage({
          type: 'SINGLE_PAGE_VERSION_RESPONSE',
          data: singlePageResult
        });
      } catch (error) {
        console.error('Single page version check error:', error);
        event.ports[0]?.postMessage({
          type: 'SINGLE_PAGE_VERSION_ERROR',
          error: error.message
        });
      }
      break;
      
    default:
      // 従来のメッセージハンドリング
      if (event.data && event.data.type === 'GET_VERSION_INFO') {
        event.ports[0].postMessage(getVersionInfo());
      }
      console.log('Message received:', type);
  }
});

// Background sync for data updates when connection is restored
self.addEventListener('sync', function(event) {
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

// ✅ エラーハンドリング
self.addEventListener('error', function(event) {
  console.error('❌ Service Worker Error:', event.error);
});

self.addEventListener('unhandledrejection', function(event) {
  console.error('❌ Service Worker Unhandled Rejection:', event.reason);
});

// ✅ 初期化完了メッセージ
console.log('%c🎉 Hololive Card Tool Service Worker initialized successfully!', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
