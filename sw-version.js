// Version Management Configuration
// このファイルはバージョンアップ時に更新されます

const APP_VERSION = "4.9.0";
const VERSION_DESCRIPTION = "バインダーレイアウト変更修正＆リアルタイム名前同期機能";

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  "index.html": "4.5.0-BINDER-COLLECTION-UPDATE",  // バインダーコレクション管理システム＆モジュラー構造
  "card_list.html": "4.5.0-SEARCH-NORMALIZATION",  // 検索機能改善 - ひらがな/カタカナ統一
  "collection_binder.html": "4.9.0-REALTIME-SYNC",  // リアルタイム名前同期＆レイアウト修正
  "binder_collection.html": "4.5.0-LAYOUT-FIX",  // レイアウト変更時の構造統一修正
  "holoca_skill_page.html": "4.5.0-SEARCH-NORMALIZATION",  // 検索機能改善 - ひらがな/カタカナ統一
  "deck_builder.html": "4.5.0-SEARCH-NORMALIZATION"  // 検索機能改善 - ひらがな/カタカナ統一
};

// ✅ 更新内容の詳細情報
const UPDATE_DETAILS = {
  title: "🔄 レイアウト修正＆リアルタイム同期 v4.9.0",
  description: "バインダーレイアウト変更時の問題修正とリアルタイム名前同期機能を追加しました",
  changes: [
    "🔧 バインダーレイアウト変更時の構造統一修正",
    "🔄 リアルタイムバインダー名同期機能",
    "📱 BroadcastChannelとlocalStorageイベントによる通信",
    "🎯 バインダー編集→即座に他タブに反映",
    "💾 レイアウト変更時のデータ整合性確保",
    "🏷️ バインダー名表示の正確性向上",
    "✨ 編集完了後の自動リロード機能",
    "🔄 設定変更の即座な反映システム"
  ]
};

// Export for Service Worker (using global assignment for compatibility)
if (typeof self !== "undefined") {
  self.APP_VERSION = APP_VERSION;
  self.VERSION_DESCRIPTION = VERSION_DESCRIPTION;
  self.PAGE_VERSIONS = PAGE_VERSIONS;
  self.UPDATE_DETAILS = UPDATE_DETAILS;
}
