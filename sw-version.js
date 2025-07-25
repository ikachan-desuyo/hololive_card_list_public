// Version Management Configuration
// このファイルはバージョンアップ時に更新されます

const APP_VERSION = "4.9.0";
const VERSION_DESCRIPTION = "バインダーレイアウト変更修正＆リアルタイム名前同期機能";

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  "index.html": "4.9.0-BINDER-COLLECTION-UPDATE",  // 最新: Binder collection management system, modular structure, event notification, and mobile improvements
  "binder_collection.html": "4.9.0-BINDER-EDIT-IMPROVEMENTS",  // 最新: Enhanced binder editing modal, layout selection, image upload, mobile responsiveness, and event notification.
  "collection_binder.html": "4.9.0-BINDER-SETTINGS",  // 最新: Comprehensive binder settings, layout management, metadata editing, event notification, and mobile improvements
  "card_list.html": "4.9.0-SEARCH-NORMALIZATION",  // 最新: Search improvements, normalization, event notification, and mobile support
  "holoca_skill_page.html": "4.9.0-SEARCH-NORMALIZATION",  // 最新: Search improvements, normalization, event notification, and mobile support
  "deck_builder.html": "4.9.0-SEARCH-NORMALIZATION"  // 最新: Search improvements, normalization, event notification, and mobile support
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
