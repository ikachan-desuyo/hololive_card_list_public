// Version Management Configuration
// このファイルはバージョンアップ時に更新されます

const APP_VERSION = "1.0.0";
const VERSION_DESCRIPTION = "Initial-Release";

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  "index.html": "1.0.0-Initial-Release",  // 初回リリース
  "binder_collection.html": "1.0.0-Initial-Release",  // 初回リリース
  "collection_binder.html": "1.0.0-Initial-Release",  // 初回リリース
  "card_list.html": "1.0.0-Initial-Release",  // 初回リリース
  "holoca_skill_page.html": "1.0.0-Initial-Release",  // 初回リリース
  "deck_builder.html": "1.0.0-Initial-Release"  // 初回リリース
};

// ✅ 更新内容の詳細情報
const UPDATE_DETAILS = {
  title: "� 初回リリース v1.0.0",
  description: "Hololive Official Card Game Collection Manager の正式リリース",
  changes: [
    "🎯 カードリスト管理機能",
    "📚 バインダーコレクション機能", 
    "🔧 デッキビルダー機能",
    "🎨 ダークモード対応",
    "📱 レスポンシブデザイン",
    "💾 データ保存・読み込み機能"
  ]
};

// Export for Service Worker (using global assignment for compatibility)
if (typeof self !== "undefined") {
  self.APP_VERSION = APP_VERSION;
  self.VERSION_DESCRIPTION = VERSION_DESCRIPTION;
  self.PAGE_VERSIONS = PAGE_VERSIONS;
  self.UPDATE_DETAILS = UPDATE_DETAILS;
}
