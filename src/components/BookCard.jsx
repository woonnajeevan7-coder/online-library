// ──────────────────────────────────────────────────────
//  BookCard.jsx — Reusable card used on Home & Browse pages
// ──────────────────────────────────────────────────────

import { Link } from "react-router-dom";

// Render star icons based on a numeric rating (0–5)
function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="stars" aria-label={`Rating: ${rating} out of 5`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(empty)}
    </span>
  );
}

// Map category names to emoji icons for the fallback cover
const categoryIcons = {
  Fiction:       "📖",
  "Non-Fiction": "📰",
  "Sci-Fi":      "🚀",
  Biography:     "🧑‍💼",
  Technology:    "💻",
};

export default function BookCard({ book }) {
  const { id, title, author, rating, category, cover } = book;

  return (
    <article className="book-card">
      {/* ── Cover image (with fallback emoji) ── */}
      <div className="book-card__cover">
        {cover ? (
          <img src={cover} alt={`Cover of ${title}`} loading="lazy" />
        ) : (
          <div className="book-card__cover-fallback">
            {categoryIcons[category] || "📚"}
          </div>
        )}
        {/* Category badge overlaid on cover */}
        <span className="book-card__category-badge">{category}</span>
      </div>

      {/* ── Card body ── */}
      <div className="book-card__body">
        <h3 className="book-card__title">{title}</h3>
        <p  className="book-card__author">{author}</p>

        {/* Star rating + numeric score */}
        <div className="book-card__rating">
          <StarRating rating={rating} />
          <span className="rating-num">{rating}</span>
        </div>
      </div>

      {/* ── View Details button ── */}
      <div className="book-card__footer">
        <Link to={`/book/${id}`} className="btn btn--primary">
          View Details →
        </Link>
      </div>
    </article>
  );
}
