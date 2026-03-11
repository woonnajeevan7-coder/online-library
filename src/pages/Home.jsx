// ──────────────────────────────────────────────────────────────
//  Home.jsx — Landing page: hero, categories, popular books
// ──────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllBooks } from "../redux/booksSlice";
import CategoryList from "../components/CategoryList";
import BookCard from "../components/BookCard";

export default function Home() {
  const allBooks = useSelector(selectAllBooks);

  // Filter to "popular" books for the featured section
  const popularBooks = allBooks.filter((b) => b.popular);

  return (
    <main className="page-enter">

      {/* ════════════════ HERO ════════════════ */}
      <section className="hero" aria-labelledby="hero-heading">
        <p className="hero__eyebrow">Your personal reading companion</p>
        <h1 id="hero-heading" className="hero__title">
          Discover Your Next <em>Great Read</em>
        </h1>
        <p className="hero__subtitle">
          Thousands of books across every genre, curated for curious minds.
          Browse, explore, and lose yourself in a story.
        </p>
        <Link to="/browse-books" className="hero__cta">
          Explore the Collection →
        </Link>
      </section>

      {/* ════════════════ CATEGORIES ════════════════ */}
      <section className="section section--alt" aria-labelledby="cat-heading">
        <div className="container">
          <div className="section__header">
            <h2 id="cat-heading" className="section__title">Browse by Genre</h2>
            <span className="section__line" aria-hidden="true" />
          </div>
          <p className="section__sub">
            Click a category to see all titles in that genre.
          </p>
          <CategoryList />
        </div>
      </section>

      {/* ════════════════ POPULAR BOOKS ════════════════ */}
      <section className="section" aria-labelledby="popular-heading">
        <div className="container">
          <div className="section__header">
            <h2 id="popular-heading" className="section__title">Popular Right Now</h2>
            <span className="section__line" aria-hidden="true" />
          </div>

          {popularBooks.length > 0 ? (
            <div className="books-grid">
              {popularBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--smoke)" }}>No popular books yet.</p>
          )}

          {/* Link to browse all books */}
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/browse-books" className="btn btn--outline">
              View All Books →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} <span>LibraVault</span> — Built with React &amp; Redux Toolkit</p>
      </footer>

    </main>
  );
}
