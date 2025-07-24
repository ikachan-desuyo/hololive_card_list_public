// Version Management Configuration
// このファイルはバージョンアップ時に更新されます

const APP_VERSION = '4.5.0';
const VERSION_DESCRIPTION = '検索機能改善＆カードタイプフィルター動的生成＆モジュラー構造';

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  'index.html': '4.5.0-BINDER-COLLECTION-UPDATE',  // バインダーコレクション管理システム＆モジュラー構造
  'card_list.html': '4.5.0-SEARCH-NORMALIZATION',  // 検索機能改善 - ひらがな/カタカナ統一
  'collection_binder.html': '4.5.0-DYNAMIC-CARDTYPE-FILTER',  // 動的カードタイプフィルター＆検索正規化
  'binder_collection.html': '4.2.0-CREATE-IMPROVEMENTS',  // バインダー作成機能改善 - 画像処理＆エラーハンドリング
  'holoca_skill_page.html': '4.5.0-SEARCH-NORMALIZATION',  // 検索機能改善 - ひらがな/カタカナ統一
  'deck_builder.html': '4.5.0-SEARCH-NORMALIZATION'  // 検索機能改善 - ひらがな/カタカナ統一
};

// ✅ 更新内容の詳細情報
const UPDATE_DETAILS = {
  title: '🔍 検索機能大幅改善＆モジュラー構造化 v4.5.0',
  description: '全ページの検索機能とカードタイプフィルターを大幅改善し、Service Workerをモジュラー構造に変更しました',
  changes: [
    '🔤 ひらがな/カタカナ統一検索機能実装',
    '🔠 大文字/小文字統一検索機能実装',
    '🏷️ 動的カードタイプフィルター生成',
    '📋 「・」分割カードタイプの個別表示',
    '📱 モバイル版カード詳細モーダル改善',
    '🎨 セレクトボックス2列グリッドレイアウト',
    '🔧 Service Workerのモジュラー構造化',
    '📦 ユーティリティ関数の分離',
    '🔄 メッセージハンドラーの分離',
    '⚡ コードの可読性と保守性向上'
  ]
};

// Export for Service Worker (using global assignment for compatibility)
if (typeof self !== 'undefined') {
  self.APP_VERSION = APP_VERSION;
  self.VERSION_DESCRIPTION = VERSION_DESCRIPTION;
  self.PAGE_VERSIONS = PAGE_VERSIONS;
  self.UPDATE_DETAILS = UPDATE_DETAILS;
}
