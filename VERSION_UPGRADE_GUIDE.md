# バージョンアップ手順

## 📋 バージョンアップ時に変更するファイル

### 1. `sw-version.js` - メインの変更ファイル
```javascript
// 以下の値を更新してください：

const APP_VERSION = '4.X.X';  // 新しいバージョン番号
const VERSION_DESCRIPTION = '新機能の説明';  // バージョンの説明

// 各ページのバージョンを必要に応じて更新
const PAGE_VERSIONS = {
  'index.html': '4.X.X-FEATURE-NAME',
  'card_list.html': '4.X.X-FEATURE-NAME',
  // ... 他のページ
};

// 更新内容の詳細を更新
const UPDATE_DETAILS = {
  title: '🎯 新機能追加 vX.X.X',
  description: '新機能の説明',
  changes: [
    '🆕 新機能1',
    '🔧 改善1',
    // ... 変更内容
  ]
};
```

### 2. 各HTMLページのバージョンコメント
各HTMLファイルの先頭にある`<!-- Version: X.X.X-FEATURE-NAME -->`を更新

### 3. 確認事項
- [ ] `sw-version.js`のAPP_VERSION更新
- [ ] `sw-version.js`のVERSION_DESCRIPTION更新
- [ ] `sw-version.js`のPAGE_VERSIONS更新（必要に応じて）
- [ ] `sw-version.js`のUPDATE_DETAILS更新
- [ ] 各HTMLファイルのバージョンコメント更新（必要に応じて）
- [ ] 構文エラーチェック実行

## 🎯 バージョンアップの利点

### モジュラー構造により：
1. **変更箇所の明確化**: `sw-version.js`のみを変更すればOK
2. **ミス削減**: 散在していたバージョン情報が一箇所に集約
3. **作業効率化**: HTMLページのバージョンは必要時のみ更新
4. **保守性向上**: バージョン管理が独立したファイルで管理

## 📝 次回バージョンアップ時のチェックリスト

- [ ] 新機能・修正内容の確認
- [ ] `sw-version.js`の APP_VERSION 更新
- [ ] `sw-version.js`の VERSION_DESCRIPTION 更新
- [ ] `sw-version.js`の UPDATE_DETAILS 更新
- [ ] 必要に応じて PAGE_VERSIONS の個別ページバージョン更新
- [ ] 対応するHTMLファイルのバージョンコメント更新
- [ ] 構文エラーチェック
- [ ] ブラウザでの動作確認
