// ─────────────────────────────────────────────────────────────
//  Navbar.jsx — Sticky top navigation with mobile burger menu
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

// Helper: render each nav item with active styling via NavLink
const navItems = [
  { to: "/",             label: "Home" },
  { to: "/browse-books", label: "Browse Books" },
  { to: "/add-book",     label: "Add Book" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu  = () => setMenuOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">

        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="Go to Home">
          <span className="navbar__logo-icon">📚</span>
          <div>
            <span className="navbar__logo-text">LibraVault</span>
            <span className="navbar__logo-sub">Online Library</span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <ul className={`navbar__links ${menuOpen ? "open" : ""}`} role="list">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end                           // "end" prevents Home from matching all routes
                className={({ isActive }) =>
                  `navbar__link${isActive ? " active" : ""}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Mobile burger button ── */}
        <button
          className="navbar__burger"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>
    </nav>
  );
}
