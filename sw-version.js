// Version Management Configuration
// このファイルはバージョンアップ時に更新されます

const APP_VERSION = '4.6.0';
const VERSION_DESCRIPTION = 'バインダー設定機能追加＆レイアウト管理＆メタデータ編集';

// ✅ 各ページのバージョン情報を一元管理
const PAGE_VERSIONS = {
  'index.html': '4.5.0-BINDER-COLLECTION-UPDATE',  // バインダーコレクション管理システム＆モジュラー構造
  'card_list.html': '4.5.0-SEARCH-NORMALIZATION',  // 検索機能改善 - ひらがな/カタカナ統一
  'collection_binder.html': '4.6.0-BINDER-SETTINGS',  // バインダー設定機能＆レイアウト管理
  'binder_collection.html': '4.2.0-CREATE-IMPROVEMENTS',  // バインダー作成機能改善 - 画像処理＆エラーハンドリング
  'holoca_skill_page.html': '4.5.0-SEARCH-NORMALIZATION',  // 検索機能改善 - ひらがな/カタカナ統一
  'deck_builder.html': '4.5.0-SEARCH-NORMALIZATION'  // 検索機能改善 - ひらがな/カタカナ統一
};

// ✅ 更新内容の詳細情報
const UPDATE_DETAILS = {
  title: '🎯 バインダー設定機能追加 v4.6.0',
  description: 'バインダーの詳細設定とレイアウト管理機能を追加しました',
  changes: [
    '⚙️ バインダー設定モーダル追加（名前・説明・表紙画像）',
    '📐 レイアウト変更機能（3×3, 4×3, 4×4, 5×4）',
    '🎨 カード詳細表示のレイアウト改善',
    '� 公開設定機能追加',
    '💾 設定の永続化とタイトル更新',
    '📱 モバイル対応の設定画面',
    '🔄 レイアウト変更時の自動カード再配置',
    '⚡ バインダータイトルの動的更新',
    '🎴 表紙画像プレビュー機能',
    '✅ 設定保存時の確認機能'
  ]
};

// Export for Service Worker (using global assignment for compatibility)
if (typeof self !== 'undefined') {
  self.APP_VERSION = APP_VERSION;
  self.VERSION_DESCRIPTION = VERSION_DESCRIPTION;
  self.PAGE_VERSIONS = PAGE_VERSIONS;
  self.UPDATE_DETAILS = UPDATE_DETAILS;
}
