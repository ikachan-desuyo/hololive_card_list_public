# 📚 Hololive Card Web Tools v4.5.0

[![Version](https://img.shields.io/badge/version-4.5.0-blue.svg)](https://github.com/ikachan-desuyo/hololive_card_list_check)
[![PWA](https://img.shields.io/badge/PWA-ready-green.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Offline](https://img.shields.io/badge/offline-support-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 🚀 最新アップデート v4.5.0

**検索機能大幅改善＆モジュラー構造化**
- 🔤 ひらがな/カタカナ統一検索機能実装
- 🔠 大文字/小文字統一検索機能実装
- 🏷️ 動的カードタイプフィルター生成
- 📋 「・」分割カードタイプの個別表示
- 📱 モバイル版カード詳細モーダル改善
- 🎨 セレクトボックス2列グリッドレイアウト
- 🔧 Service Workerのモジュラー構造化
- 📦 ユーティリティ関数の分離
- 🔄 メッセージハンドラーの分離
- ⚡ コードの可読性と保守性向上

## 🏠 Main Page (`index.html`) v4.5.0

Landing page with navigation to all available tools:
- **Card List**: Browse and manage your card collection with advanced search
- **Card Detail Search**: Advanced search with detailed filters and skill analysis
- **Deck Builder**: Create and manage card decks with improved UI
- **Collection Binder**: Virtual binder management with drag & drop functionality
- **Binder Collection**: Manage multiple binders with custom covers

## 🗂 Hololive Card List (`card_list.html`) v4.5.0

A responsive card list tool for browsing, filtering, and managing your Hololive cards with enhanced search capabilities.

### ✅ Features

#### Enhanced Search System
- **Normalized Search**: ひらがな/カタカナ統一、大文字/小文字統一検索
- **Real-time filtering**: Instant results as you type
- **Keyword search**: Searches name, ID, tags, skills with normalization
- **Product filter**: Partial match dropdown with auto-complete

#### View Modes
- **Table view**: Structured details in a grid layout
- **Compact view**: Image-focused display optimized for mobile
- **Scroll-based loading**: Cards render gradually for performance (`renderLimit`)

#### Advanced Filter System (chip-style UI)
- **Ownership**: `Owned` / `Unowned` toggle
- **Rarity**: Auto-generated buttons + `All` button
- **Color**: Auto-generated buttons + `All` button  
- **Bloom**: Auto-generated buttons + `All` button
- **Dynamic Card Types**: Auto-generated from actual data, supports "・" separated types

> 🧠 All filters use chip-style toggle buttons. "All" button clears other selections and becomes exclusive.

#### Statistics Dashboard
- Real-time count of:
  - Displayed cards
  - Owned cards  
  - Ownership rate (%)
- Always calculated from **full filtered set**, not just rendered items

#### Ownership Management
- Manual input per card (stored via `localStorage`)
- **CSV Import**: Accepts `id,ownedCount` format
- **CSV Export**: Copies owned data to clipboard
- Cross-page data synchronization

#### Mobile Optimization
- Responsive layout with 2-column grid for selects
- Optimized card detail modals
- Touch-friendly interface
- Dark mode toggle (persistent across pages)

---

## 🔍 Hololive Card Detail Search (`holoca_skill_page.html`) v4.5.0

A skill-based search tool for advanced filtering across card abilities with enhanced search normalization.

### ✅ Features

#### Enhanced Search Filters
- **Normalized Search**: ひらがな/カタカナ統一、大文字/小文字統一検索
- By card attributes:
  - Name / ID / Rarity / Type with normalized search
- By skills:
  - Skill text partial match with normalization
  - Leader / Normal skill separation
  - Cost type / HP trigger / Skill level condition
- Tags and products via dropdown match

#### Skill Logic Detection
- Auto-highlights keywords:
  - Buff/Debuff terms (ATK UP, DMG DOWN)
  - Activation timing (start, recovery)
  - HP thresholds, skill levels
- Visual emphasis to enhance parsing

#### Result Display
- Image thumbnails (clickable modal zoom)
- Ownership count (shared with list page)
- Grouped by product or card type
- Mobile-optimized layout

#### Statistics
- Total match count
- Total owned among results

---

## 🃏 Deck Builder (`deck_builder.html`) v4.5.0

Create and manage card decks with enhanced search and filtering capabilities.

### ✅ Features

#### Enhanced Deck Building
- **Normalized Search**: ひらがな/カタカナ統一、大文字/小文字統一検索
- Drag & drop card management
- Real-time deck validation
- Card count tracking
- Export/import functionality

#### Advanced Filters
- Color, rarity, type filtering with normalization
- Cost-based filtering
- Skill-based search
- Mobile-optimized interface

---

## 📚 Collection Binder (`collection_binder.html`) v4.5.0

Virtual binder for organizing your card collection with advanced features.

### ✅ Features

#### Dynamic Card Management
- **Enhanced Search**: ひらがな/カタカナ統一、大文字/小文字統一検索
- **Dynamic Card Type Filtering**: Auto-generated from actual data
- Drag & drop functionality
- Grid-based layout
- Real-time filtering

#### Advanced Filtering
- **Normalized Search**: All text searches use normalization
- Dynamic card type generation from data
- "・" separated card types displayed individually
- Mobile-optimized 2-column grid layout

#### Visual Enhancements
- Card hover effects
- Responsive design
- Dark mode support
- Touch-friendly interface

---

## 🗂️ Binder Collection (`binder_collection.html`) v4.2.0

Manage multiple binders with custom covers and descriptions.

### ✅ Features

#### Binder Management
- Create multiple binders
- Custom cover images
- Binder descriptions
- Independent data storage per binder

#### User Interface
- Mobile-optimized layout
- Responsive design
- Easy navigation between binders

---

## 🛠️ Technical Architecture

### Modular Service Worker Structure
- **`sw.js`**: Main Service Worker with event listeners
- **`sw-version.js`**: Version management and configuration
- **`sw-utils.js`**: Utility functions for version checking
- **`sw-handlers.js`**: Message handlers for client communication

### Progressive Web App Features
- **Offline Support**: Full functionality without internet
- **Caching Strategy**: Network-first for HTML, cache-first for assets
- **Background Sync**: Data updates when connection restored
- **Responsive Design**: Optimized for all device sizes

### Search Normalization
- **Text Normalization**: Converts hiragana ⇔ katakana for unified search
- **Case Insensitive**: Automatic case normalization
- **Cross-Page Consistency**: Same search behavior across all tools

### Data Management
- **LocalStorage**: Persistent data storage
- **Cross-Page Sync**: Shared data between tools
- **Import/Export**: CSV functionality for data portability

---

## 📱 Mobile Optimization

All tools are fully optimized for mobile devices:
- Touch-friendly interfaces
- 2-column grid layouts for space efficiency
- Responsive modals and overlays
- Optimized image loading
- Swipe gestures support

---

## 🚀 Getting Started

1. Open `index.html` in your web browser
2. Navigate to your desired tool
3. Start managing your Hololive card collection!

### PWA Installation
- Chrome/Edge: Click "Install" prompt or "Add to Home Screen"
- iOS Safari: Share → "Add to Home Screen"
- Android: "Add to Home Screen" from browser menu

---

## 🔧 Development

### Version Management
Version updates are centralized in `sw-version.js`. See `VERSION_UPGRADE_GUIDE.md` for upgrade procedures.

### File Structure
```
├── index.html                 # Main landing page
├── card_list.html            # Card browsing tool
├── holoca_skill_page.html    # Skill search tool
├── deck_builder.html         # Deck building tool
├── collection_binder.html    # Virtual binder
├── binder_collection.html    # Binder management
├── sw.js                     # Main service worker
├── sw-version.js             # Version configuration
├── sw-utils.js               # Utility functions
├── sw-handlers.js            # Message handlers
├── json_file/
│   ├── card_data.json        # Card database
│   └── release_dates.json    # Release information
└── images/                   # Asset images
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for the Hololive community**
