// ────────────────────────────────────────────────────────────
//  BookDetails.jsx — Single book view at route /book/:id
// ────────────────────────────────────────────────────────────

import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../redux/booksSlice";

// Render filled / empty stars for the rating
function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span style={{ color: "var(--gold)", fontSize: "1.3rem", letterSpacing: "0.05em" }}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(empty)}
    </span>
  );
}

const categoryIcons = {
  Fiction:       "📖",
  "Non-Fiction": "📰",
  "Sci-Fi":      "🚀",
  Biography:     "🧑‍💼",
  Technology:    "💻",
};

export default function BookDetails() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const allBooks   = useSelector(selectAllBooks);

  // Find the book whose id matches the URL param (cast to number for seed data)
  const book = allBooks.find((b) => b.id === Number(id) || b.id === id);

  // ── 404 fallback if book not found ──
  if (!book) {
    return (
      <div className="book-details page-enter" style={{ textAlign: "center", paddingTop: "5rem" }}>
        <p style={{ fontSize: "4rem", marginBottom: "1rem" }}>📭</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem" }}>
          Book Not Found
        </h2>
        <p style={{ color: "var(--smoke)", marginBottom: "2rem" }}>
          The book you're looking for doesn't exist in our library.
        </p>
        <Link to="/browse-books" className="btn btn--primary" style={{ display: "inline-flex", width: "auto" }}>
          ← Back to Browse Books
        </Link>
      </div>
    );
  }

  const {
    title, author, category, rating,
    description, year, pages, cover,
  } = book;

  return (
    <main>
      <div className="book-details">

        {/* ── Back button ── */}
        <div className="book-details__back">
          <button
            className="btn btn--outline"
            onClick={() => navigate(-1)}
            aria-label="Go back to previous page"
          >
            ← Back to Browse Books
          </button>
        </div>

        {/* ── Main layout: cover | details ── */}
        <div className="book-details__layout">

          {/* Cover */}
          <div className="book-details__cover">
            {cover ? (
              <img src={cover} alt={`Cover of ${title}`} />
            ) : (
              <div className="book-details__cover-fallback">
                {categoryIcons[category] || "📚"}
              </div>
            )}
          </div>

          {/* Text content */}
          <div className="book-details__content">
            <span className="book-details__category">{category}</span>

            <h1 className="book-details__title">{title}</h1>
            <p  className="book-details__author">by {author}</p>

            {/* Meta row: rating, year, pages */}
            <div className="book-details__meta">
              <div className="book-details__meta-item">
                <span className="book-details__meta-label">Rating</span>
                <span className="book-details__meta-value">
                  <StarRating rating={rating} />
                  <span style={{ marginLeft: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--smoke)" }}>
                    ({rating} / 5)
                  </span>
                </span>
              </div>

              {year && (
                <div className="book-details__meta-item">
                  <span className="book-details__meta-label">Published</span>
                  <span className="book-details__meta-value">{year}</span>
                </div>
              )}

              {pages && (
                <div className="book-details__meta-item">
                  <span className="book-details__meta-label">Pages</span>
                  <span className="book-details__meta-value">{pages}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <>
                <p className="book-details__description-label">About this book</p>
                <p className="book-details__description">{description}</p>
              </>
            )}

            {/* Action buttons */}
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                to={`/books/${encodeURIComponent(category)}`}
                className="btn btn--outline"
              >
                More {category} Books
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} <span>LibraVault</span></p>
      </footer>
    </main>
  );
}
