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
  title: '� バインダー閲覧モード修正＆バグ修正 v4.5.1',
  description: 'バインダーの閲覧モードとカード詳細検索ページの不具合を修正しました',
  changes: [
    '�️ バインダー閲覧モードでページ管理ボタンを正しく非表示に',
    '� カード詳細検索ページの不正HTMLタグを削除',
    '📚 モジュラー構造の安定性向上',
    '�️ コレクションバインダーの表示制御改善',
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
