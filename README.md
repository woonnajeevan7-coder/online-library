# 📚 LibraVault — Online Library System

A full-featured online library application built with **React + Vite + Redux Toolkit + React Router DOM**. Browse books by category, search the catalogue, view detailed book pages, and add your own books to the collection.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Home Page** | Welcome hero, genre categories, popular books |
| 🔍 **Browse & Search** | Real-time search by title or author |
| 📂 **Category Filtering** | Dynamic routes per genre (`/books/:category`) |
| 📖 **Book Details** | Full book view at `/book/:id` |
| ➕ **Add a Book** | Form with validation → Redux store → redirects |
| ❌ **404 Page** | Custom not-found page with invalid route displayed |
| 🎨 **Responsive UI** | Clean editorial aesthetic, mobile-friendly |

---

## 🛠 Tech Stack

- **React 18** — UI library (functional components + hooks)
- **Vite 5** — Lightning-fast dev server & build tool
- **Redux Toolkit** — Global state management (books slice)
- **React Router DOM v6** — Client-side routing
- **CSS Custom Properties** — Theming without a framework

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/woonnajeevan7-coder/online-library.git

# 2. Navigate into the project folder
cd online-library

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will open at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📁 Folder Structure

```
online-library/
│
├── public/                  # Static assets (favicon, etc.)
│
├── src/
│   │
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Sticky navigation with mobile burger
│   │   ├── BookCard.jsx     # Book card used in grids
│   │   ├── SearchBar.jsx    # Redux-connected live search input
│   │   └── CategoryList.jsx # Clickable genre cards linking to /books/:category
│   │
│   ├── pages/               # Route-level page components
│   │   ├── Home.jsx         # Landing page (hero + categories + popular books)
│   │   ├── BrowseBooks.jsx  # Full catalogue with search & category tabs
│   │   ├── BookDetails.jsx  # Single book view (/book/:id)
│   │   ├── AddBook.jsx      # Add-book form with validation
│   │   └── NotFound.jsx     # 404 page (no Navbar)
│   │
│   ├── redux/               # Redux Toolkit state management
│   │   ├── store.js         # Configure and export the Redux store
│   │   └── booksSlice.js    # Books state, reducers, and selectors
│   │
│   ├── data/
│   │   └── booksData.js     # 15 seed books + categories array
│   │
│   ├── styles/
│   │   └── main.css         # All styles (editorial library aesthetic)
│   │
│   ├── App.jsx              # Route definitions (MainLayout + 404)
│   └── main.jsx             # Entry point — Provider + BrowserRouter
│
├── index.html               # Vite HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Project metadata & scripts
└── README.md                # This file
```

---

## 🗺 Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page |
| `/browse-books` | `BrowseBooks` | All books with search |
| `/books/:category` | `BrowseBooks` | Books filtered by genre |
| `/book/:id` | `BookDetails` | Single book detail view |
| `/add-book` | `AddBook` | Add book form |
| `*` | `NotFound` | 404 fallback |

---

## 🗄 Redux State Shape

```js
{
  books: {
    books: Book[],        // Array of all book objects
    searchQuery: string,  // Current search filter string
  }
}
```

### Book Schema

```js
{
  id:          number | string,  // Unique identifier
  title:       string,
  author:      string,
  category:    "Fiction" | "Non-Fiction" | "Sci-Fi" | "Biography" | "Technology",
  description: string,
  rating:      number,           // 1.0 – 5.0
  cover:       string,           // URL (empty string for user-added books)
  year:        number,
  pages:       number | null,
  popular:     boolean,
}
```

---

## 📝 Form Validation Rules

| Field | Rule |
|---|---|
| Title | Required, min 2 chars |
| Author | Required, min 2 chars |
| Category | Must select one of 5 genres |
| Description | Required, min 20 chars |
| Rating | Must select 1–5 stars |

---

## 🔀 Git Commit History (10 meaningful commits)

```
1. feat: initialise Vite + React project with folder structure
2. feat: add dummy book data and categories array in booksData.js
3. feat: configure Redux store and create booksSlice with addBook reducer
4. feat: build Navbar component with NavLink active states and mobile burger menu
5. feat: implement Home page with hero section, CategoryList, and popular books grid
6. feat: create BrowseBooks page with search bar and dynamic /books/:category routing
7. feat: build BookDetails page displaying full book info at /book/:id
8. feat: implement AddBook form with field validation and Redux dispatch on submit
9. feat: add 404 NotFound page showing invalid route URL without Navbar
10. style: apply editorial library CSS theme with responsive grid layouts
```

---

## 📸 Page Overview

- **Home** — Hero banner, genre cards, popular books
- **Browse** — Search + category tabs, full book grid
- **Details** — Book cover, metadata, description
- **Add Book** — Validated multi-field form with star picker
- **404** — Stylised error page with attempted route displayed

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## 👨‍🎓 Student Information

Name: Jeevan  
Course: B.Tech  
Subject: React JS  
Assignment: React Assignment 2 – Online Library System  

GitHub Repository:
https://github.com/woonnajeevan7-coder/online-library