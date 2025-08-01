// Version Management Configuration
// このファイルはバージョンアップ時に更新されます

const APP_VERSION = "2.0.0";
const VERSION_DESCRIPTION = "2.0.0";

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  "index.html": "2.0.0",
  "binder_collection.html": "2.0.0",
  "collection_binder.html": "2.0.0",
  "card_list.html": "2.0.0",
  "holoca_skill_page.html": "2.0.0",
  "deck_builder.html": "2.0.0"
};

// ✅ 更新内容の詳細情報
const UPDATE_DETAILS = {
  title: "v2.0.0",
  description: "メジャーバージョンアップデート",
  changes: [
    "バインダーボタンの遷移先を修正",
    "ナビゲーション整合性を統一"
  ]
};

// Export for Service Worker (using global assignment for compatibility)
if (typeof self !== "undefined") {
  self.APP_VERSION = APP_VERSION;
  self.VERSION_DESCRIPTION = VERSION_DESCRIPTION;
  self.PAGE_VERSIONS = PAGE_VERSIONS;
  self.UPDATE_DETAILS = UPDATE_DETAILS;
}
