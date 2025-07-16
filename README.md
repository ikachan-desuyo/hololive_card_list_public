# Hololive Card List Viewer

An interactive and responsive web app to manage and view Hololive trading cards.  
Designed with mobile-first usability and flexible layout logic for an intuitive experience across devices.

---

## 🚀 Features

### 🔄 View Modes
- **Table View**: Full card details with filtering, sorting, and editable ownership counts.
- **Compact Preview Mode**: Grid layout showing card image, name, rarity, and count.
- **Manual Mode Switching**: Users can toggle between table and preview view anytime.

### 📱 Mobile Layout Support
- **Automatic Layout Adjustment** for mobile screens (`window.innerWidth <= 540`)
- `mobile-layout` CSS class dynamically applied on page load
- Optimized card preview box sizes and spacing for compact viewing

### ⚙️ Dynamic Filters
- Filter cards by:
  - Ownership status (`Owned` / `Unowned`)
  - Rarity
  - Color
  - Bloom Level
  - Product

- Full toggle controls:
  - “Select All” and “Clear All” buttons for checkboxes
  - Dropdown filtering by product

### 🔎 Search & Sort
- Search cards by name (real-time fuzzy match)
- Sort cards by:
  - Release date
  - Card ID
  - Name
  - Rarity

### 🌙 Dark Mode
- Toggleable via button
- Stored in `localStorage` and loaded on page refresh

### 📤 CSV Integration
- **Import ownership** using CSV with format: `id,quantity`
- **Export current ownership** to clipboard in CSV format
- Local ownership count saved via `localStorage`

### 🖼️ Image Viewer
- Zoomable modal popup for card previews
- Click-to-enlarge behavior on both layouts

---

## 💻 Technical Highlights

- **Responsive design** via flexible CSS and JS layout logic
- **No external dependencies** required (pure HTML/CSS/JS)
- **Smart filtering & sorting** using vanilla JavaScript
- **Mobile-first enhancements** with adaptive preview rendering
- **GitHub Pages deployment-ready** using GitHub Actions (dynamic or branch)

---

## 📱 Mobile Auto-Optimization Notes

- Layout switches **independently from view mode**
- No interference with CSV, filters, or user toggles
- Works on first page load with width check or device detection (`navigator.userAgent`)
