# 📚 Hololive Card Web Tools

## 🗂 Hololive Card List (`index.html`)

A responsive card list tool for browsing, filtering, and managing your Hololive cards.

### ✅ Features

#### View Modes
- **Table view**: Structured details in a grid layout
- **Compact view**: Image-focused display for mobile
- **Scroll-based loading**: Cards render gradually (`renderLimit`)

#### Filter System (chip-style UI)
- **Ownership**: `Owned` / `Unowned`
- **Rarity**: Auto-generated buttons + `All` button
- **Color**: Auto-generated buttons + `All` button
- **Bloom**: Auto-generated buttons + `All` button
- **Keyword search**: Searches name, ID, tags, skills
- **Product filter**: Partial match dropdown

> 🧠 All filters use chip-style toggle buttons. “All” button clears other selections and becomes exclusive.

#### Statistics
- Real-time count of:
  - Displayed cards
  - Owned cards
  - Ownership rate (%)
- Always calculated from **full filtered set**, not just rendered items

#### Ownership Tracking
- Manual input per card (stored via `localStorage`)
- **CSV Import**: Accepts `id,ownedCount` format
- **CSV Export**: Copies owned data to clipboard

#### Other Utilities
- Card image modal zoom
- Dark mode toggle (persistent)
- Responsive mobile layout (adaptive styling)

---

## 🔍 Hololive Card Detail Search (`holoca_skill_page.html`)

A skill-based search tool for advanced filtering across card abilities.

### ✅ Features

#### Search Filters
- By card attributes:
  - Name / ID / Rarity / Type
- By skills:
  - Skill text partial match
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

#### Statistics
- Total match count
- Total owned among results

---
