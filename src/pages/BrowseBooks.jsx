// ──────────────────────────────────────────────────────────────
//  BrowseBooks.jsx — Full catalogue with search + category filter
//  Handles both /browse-books and /books/:category routes
// ──────────────────────────────────────────────────────────────

import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFilteredBooks, selectSearchQuery } from "../redux/booksSlice";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { categories } from "../data/booksData";

export default function BrowseBooks() {
  const { category } = useParams(); // Populated when route is /books/:category
  const navigate     = useNavigate();

  // Get books already filtered by search query (via Redux selector)
  const searchFiltered = useSelector(selectFilteredBooks);
  const searchQuery    = useSelector(selectSearchQuery);

  // Further filter by URL category param when present
  const displayedBooks = category
    ? searchFiltered.filter((b) => b.category === decodeURIComponent(category))
    : searchFiltered;

  // ── Category tab click → navigate to /books/:cat or reset
  const handleCategoryClick = (cat) => {
    if (cat === category) {
      navigate("/browse-books"); // Clicking active category deselects it
    } else {
      navigate(`/books/${encodeURIComponent(cat)}`);
    }
  };

  return (
    <main className="page-enter">

      {/* ── Dark header with search bar ── */}
      <header className="browse-header">
        <div className="browse-header__inner">
          <h1 className="browse-header__title">
            {category ? `📚 ${decodeURIComponent(category)}` : "Browse All Books"}
          </h1>
          <p className="browse-header__sub">
            {category
              ? `Showing all books in the "${decodeURIComponent(category)}" genre`
              : "Explore our full collection across all genres"}
          </p>
          {/* SearchBar dispatches to Redux; filtering happens in selector */}
          <SearchBar />
        </div>
      </header>

      {/* ── Toolbar: category tabs + result count ── */}
      <div className="browse-toolbar">
        <div className="browse-toolbar__left">
          {/* "All" tab */}
          <button
            className={`btn btn--sm ${!category ? "btn--gold" : "btn--outline"}`}
            onClick={() => navigate("/browse-books")}
          >
            All
          </button>

          {/* One tab per category */}
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn--sm ${
                category === cat ? "btn--gold" : "btn--outline"
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search query badge + result count */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {searchQuery && (
            <span className="filter-badge">
              🔍 "{searchQuery}"
            </span>
          )}
          <span className="browse-count">
            {displayedBooks.length} {displayedBooks.length === 1 ? "result" : "results"}
          </span>
        </div>
      </div>

      {/* ── Book grid / empty state ── */}
      <section className="section">
        <div className="container">
          {displayedBooks.length > 0 ? (
            <div className="books-grid">
              {displayedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon">🔎</span>
              <h3 className="empty-state__title">No books found</h3>
              <p>
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No books in this category yet."}
              </p>
              <br />
              <Link to="/add-book" className="btn btn--primary" style={{ display: "inline-flex", width: "auto" }}>
                + Add the First Book
              </Link>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} <span>LibraVault</span></p>
      </footer>
    </main>
  );
}
