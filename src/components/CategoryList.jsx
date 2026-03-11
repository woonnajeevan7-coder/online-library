// ────────────────────────────────────────────────────────────────
//  CategoryList.jsx — Clickable category cards that link to
//  the /books/:category dynamic route
// ────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../redux/booksSlice";
import { categories } from "../data/booksData";

// Assign a representative emoji to each category
const categoryMeta = {
  Fiction:       { icon: "📖", color: "#7b2d42" },
  "Non-Fiction": { icon: "📰", color: "#2d5a7b" },
  "Sci-Fi":      { icon: "🚀", color: "#3a2d7b" },
  Biography:     { icon: "🧑‍💼", color: "#2d7b3a" },
  Technology:    { icon: "💻", color: "#7b5a2d" },
};

export default function CategoryList() {
  const allBooks = useSelector(selectAllBooks);

  // Count how many books belong to each category
  const countForCategory = (cat) =>
    allBooks.filter((b) => b.category === cat).length;

  return (
    <div className="category-grid">
      {categories.map((cat) => {
        const meta  = categoryMeta[cat] || { icon: "📚", color: "#555" };
        const count = countForCategory(cat);

        return (
          /* Each card links to the filtered browse page */
          <Link
            key={cat}
            to={`/books/${encodeURIComponent(cat)}`}
            className="category-card"
            aria-label={`Browse ${cat} books (${count} titles)`}
          >
            <span className="category-card__icon">{meta.icon}</span>
            <span className="category-card__name">{cat}</span>
            <span className="category-card__count">
              {count} {count === 1 ? "book" : "books"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
