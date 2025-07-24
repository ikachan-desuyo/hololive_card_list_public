#!/usr/bin/env node

/**
 * バージョン更新スクリプト
 * 使用方法: node update-version.js 4.9.0 "新機能の説明"
 */

const fs = require('fs');
const path = require('path');

// コマンドライン引数の取得
const [,, newVersion, newDescription] = process.argv;

if (!newVersion || !newDescription) {
  console.error('使用方法: node update-version.js <バージョン> "<説明>"');
  console.error('例: node update-version.js 4.9.0 "新機能追加"');
  process.exit(1);
}

// sw-version.jsのパス
const versionFilePath = path.join(__dirname, 'sw-version.js');

try {
  // 現在のファイル内容を読み込み
  let content = fs.readFileSync(versionFilePath, 'utf8');
  
  // バージョン番号を更新
  content = content.replace(
    /const APP_VERSION = '[^']+';/,
    `const APP_VERSION = '${newVersion}';`
  );
  
  // バージョン説明を更新
  content = content.replace(
    /const VERSION_DESCRIPTION = '[^']+';/,
    `const VERSION_DESCRIPTION = '${newDescription}';`
  );
  
  // ファイルに書き戻し
  fs.writeFileSync(versionFilePath, content, 'utf8');
  
  console.log(`✅ バージョンを ${newVersion} に更新しました`);
  console.log(`📝 説明: ${newDescription}`);
  
} catch (error) {
  console.error('❌ バージョン更新に失敗しました:', error.message);
  process.exit(1);
}
