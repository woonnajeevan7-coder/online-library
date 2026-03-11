// ────────────────────────────────────────────────────────────
//  NotFound.jsx — 404 page shown for unmatched routes.
//  NOTE: Navbar is intentionally NOT rendered on this page.
// ────────────────────────────────────────────────────────────

import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  // useLocation gives us the attempted route so we can display it
  const { pathname } = useLocation();

  return (
    <div className="not-found">
      <div className="not-found__inner">
        {/* Large hollow 404 numeral */}
        <div className="not-found__code" aria-label="Error 404">404</div>

        <h1 className="not-found__title">Page Not Found</h1>

        {/* Show the invalid route URL */}
        <div className="not-found__route" aria-label="Invalid route">
          {pathname}
        </div>

        <p className="not-found__text">
          The page you're looking for doesn't exist in our library.<br />
          It may have been moved, deleted, or never existed.
        </p>

        {/* Link back to Home — this is the ONLY navigation on this page */}
        <Link to="/" className="btn btn--gold" style={{ display: "inline-flex", width: "auto" }}>
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}
