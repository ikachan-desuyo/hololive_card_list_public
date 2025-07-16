
📚 README — Hololive Card Web Tools
🗂 Hololive Card List (index.html)
A responsive card list page for managing your Hololive card collection. Built for both desktop and mobile views.
✅ Features
- View Modes
- Table view: structured card details in grid format
- Compact view: image-focused gallery optimized for small screens
- Auto expansion on scroll (renderLimit)
- Filter System (fully chip-style UI)
- Ownership: Owned / Unowned toggle buttons
- Rarity: dynamically generated + All button
- Color: dynamically generated + All button
- Bloom: dynamically generated + All button
- Product: searchable dropdown
- Keyword search: full-text match across name, ID, tags, and skills
- Statistics Summary
- Displayed above card list
- Auto-updates based on filtered result
- Includes:
- Number of owned cards
- Number of filtered cards
- Ownership ratio (%)
- Card Ownership Tracker
- Manual input per card
- LocalStorage saves across sessions
- CSV Import:
- Accepts id,ownedCount format
- Updates local storage
- CSV Export:
- Copies owned cards in id,ownedCount format
- Image Modal Viewer
- Click card image to zoom in
- Dark Mode Toggle
- Persists user preference via LocalStorage
- Responsive Mobile Layout
- Font size / spacing adjustments
- Filters compressed with scrollable layout

🔍 Hololive Card Detail Search (holoca_skill_page.html)
A data-driven advanced search page with skill filtering and logic detection.
✅ Features
- Multi-condition Filtering
- Search by:
- Card name, ID, rarity, type
- Skill text (partial match)
- Leader skill / normal skill separation
- HP condition / cost type / level presence
- Skill Detection Highlights
- Automatically identifies and color-codes:
- HP condition triggers
- Buffs / debuffs (e.g., ATK UP, DMG DOWN)
- Activation timing
- Skill level conditions
- Option to highlight detected logic terms
- Tag and Product Filters
- Dropdown search with auto-match
- Preview and Ownership Display
- Image preview with zoom modal
- Ownership input (linked to same LocalStorage as index.html)
- Product grouping and card-type based layout
- Result Statistics
- Number of results
- Filtered ownership count


