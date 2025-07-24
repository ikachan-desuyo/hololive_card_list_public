# バージョン更新ガイドライン

## 🔧 バージョン更新時の注意点

### 1. 文字エンコーディング
- ファイルは必ずUTF-8で保存
- 絵文字や特殊文字は正確にコピー
- 文字化けした場合は手動で修正

### 2. 文字列マッチング
- `replace_string_in_file`使用時は前後3-5行のコンテキストを含める
- 完全一致する文字列を使用
- 特殊文字やエスケープ文字に注意

### 3. 推奨更新手順
```bash
# 1. 自動スクリプトを使用
node update-version.js 4.9.0 "新機能説明"

# 2. 手動での部分更新
# - 小さなセクションずつ更新
# - 一度に複数箇所を変更しない

# 3. 検証
node -c sw-version.js  # 構文チェック
```

### 4. よくある失敗パターン
- 絵文字の文字化け → 正しい絵文字に手動修正
- 改行コードの不一致 → エディタの設定確認
- 重複する文字列 → より具体的なコンテキストを使用
- 特殊文字のエスケープ → Raw文字列を使用

### 5. 緊急時の対応
```javascript
// sw-version.jsが壊れた場合のテンプレート
const APP_VERSION = 'X.X.X';
const VERSION_DESCRIPTION = '説明';
const PAGE_VERSIONS = { /* ... */ };
const UPDATE_DETAILS = { /* ... */ };

// Export
if (typeof self !== 'undefined') {
  self.APP_VERSION = APP_VERSION;
  self.VERSION_DESCRIPTION = VERSION_DESCRIPTION;
  self.PAGE_VERSIONS = PAGE_VERSIONS;
  self.UPDATE_DETAILS = UPDATE_DETAILS;
}
```
