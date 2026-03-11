// ─────────────────────────────────────────────────────────────
//  SearchBar.jsx — Controlled input that dispatches to Redux
// ─────────────────────────────────────────────────────────────

import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, selectSearchQuery } from "../redux/booksSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const query    = useSelector(selectSearchQuery);

  // Update Redux store on every keystroke for live filtering
  const handleChange = (e) => dispatch(setSearchQuery(e.target.value));

  // Clear the search field
  const handleClear = () => dispatch(setSearchQuery(""));

  return (
    <div className="search-bar" role="search">
      {/* Magnifier icon */}
      <span className="search-bar__icon" aria-hidden="true">🔍</span>

      <input
        type="search"
        className="search-bar__input"
        placeholder="Search by title or author…"
        value={query}
        onChange={handleChange}
        aria-label="Search books by title or author"
        autoComplete="off"
      />

      {/* Show clear button only when there's input */}
      {query && (
        <button
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
