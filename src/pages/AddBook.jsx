// ─────────────────────────────────────────────────────────────────────
//  AddBook.jsx — Form to add a new book to the Redux store
//  Validates all fields, dispatches addBook, redirects to Browse
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "../redux/booksSlice";
import { categories } from "../data/booksData";

// ── Initial form state ────────────────────────────────────────────────
const INITIAL_FORM = {
  title:       "",
  author:      "",
  category:    "",
  description: "",
  rating:      0,
};

// ── Validation rules ─────────────────────────────────────────────────
function validate(fields) {
  const errors = {};

  if (!fields.title.trim())
    errors.title = "Title is required.";
  else if (fields.title.trim().length < 2)
    errors.title = "Title must be at least 2 characters.";

  if (!fields.author.trim())
    errors.author = "Author name is required.";
  else if (fields.author.trim().length < 2)
    errors.author = "Author name must be at least 2 characters.";

  if (!fields.category)
    errors.category = "Please select a category.";

  if (!fields.description.trim())
    errors.description = "Description is required.";
  else if (fields.description.trim().length < 20)
    errors.description = "Description must be at least 20 characters.";

  if (!fields.rating || fields.rating < 1)
    errors.rating = "Please select a rating (1–5).";

  return errors;
}

// ── StarPicker — interactive star rating control ──────────────────────
function StarPicker({ value, onChange, error }) {
  const [hovered, setHovered] = useState(0);

  return (
    <>
      <div className="rating-input" role="group" aria-label="Select rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`rating-star ${star <= (hovered || value) ? "active" : ""}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`Rate ${star} out of 5 stars`}
            aria-pressed={star === value}
          >
            ★
          </button>
        ))}
        {value > 0 && (
          <span style={{ alignSelf: "center", fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--smoke)" }}>
            {value}.0
          </span>
        )}
      </div>
      {error && <p className="form-error">⚠ {error}</p>}
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────
export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form,    setForm]    = useState(INITIAL_FORM);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});   // Track which fields the user interacted with
  const [showToast, setShowToast] = useState(false);

  // ── Generic field change handler ──────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field once user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Mark field as touched on blur (for validation feedback) ───────
  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate({ ...form });
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  // ── Star rating change ────────────────────────────────────────────
  const handleRating = (val) => {
    setForm((prev) => ({ ...prev, rating: val }));
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
  };

  // ── Form submission ───────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields at once
    const allErrors = validate(form);

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // Mark all fields as touched so errors are visible
      setTouched({ title: true, author: true, category: true, description: true, rating: true });
      return;
    }

    // Dispatch to Redux store — new book lands at the top (unshift in slice)
    dispatch(addBook({
      title:       form.title.trim(),
      author:      form.author.trim(),
      category:    form.category,
      description: form.description.trim(),
      rating:      form.rating,
      year:        new Date().getFullYear(),
      pages:       null,
    }));

    // Show success toast then redirect to Browse Books
    setShowToast(true);
    setTimeout(() => {
      navigate("/browse-books");
    }, 1500);
  };

  // ── Rendered error helper ─────────────────────────────────────────
  const fieldError = (name) =>
    touched[name] && errors[name]
      ? <p className="form-error">⚠ {errors[name]}</p>
      : null;

  return (
    <main className="page-enter">
      <div className="add-book-page">

        {/* ── Page header ── */}
        <div className="add-book-page__header">
          <p className="add-book-page__eyebrow">Contribute to the collection</p>
          <h1 className="add-book-page__title">Add a New Book</h1>
        </div>

        {/* ── Form card ── */}
        <form className="form-card" onSubmit={handleSubmit} noValidate>

          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Book Title <span className="required">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`form-input ${touched.title && errors.title ? "error" : ""}`}
              placeholder="e.g. The Alchemist"
              value={form.title}
              onChange={handleChange}
              onBlur={() => handleBlur("title")}
              autoComplete="off"
            />
            {fieldError("title")}
          </div>

          {/* Author */}
          <div className="form-group">
            <label className="form-label" htmlFor="author">
              Author <span className="required">*</span>
            </label>
            <input
              id="author"
              name="author"
              type="text"
              className={`form-input ${touched.author && errors.author ? "error" : ""}`}
              placeholder="e.g. Paulo Coelho"
              value={form.author}
              onChange={handleChange}
              onBlur={() => handleBlur("author")}
            />
            {fieldError("author")}
          </div>

          {/* Category + Rating row */}
          <div className="form-row">
            {/* Category */}
            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Category <span className="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-select ${touched.category && errors.category ? "error" : ""}`}
                value={form.category}
                onChange={handleChange}
                onBlur={() => handleBlur("category")}
              >
                <option value="">— Select genre —</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {fieldError("category")}
            </div>

            {/* Rating */}
            <div className="form-group">
              <label className="form-label">
                Rating <span className="required">*</span>
              </label>
              <StarPicker
                value={form.rating}
                onChange={handleRating}
                error={touched.rating ? errors.rating : undefined}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`form-textarea ${touched.description && errors.description ? "error" : ""}`}
              placeholder="Write a brief description of the book (at least 20 characters)…"
              value={form.description}
              onChange={handleChange}
              onBlur={() => handleBlur("description")}
              rows={4}
            />
            <span style={{ fontSize: "0.78rem", color: "var(--mist)" }}>
              {form.description.length} characters
            </span>
            {fieldError("description")}
          </div>

          {/* Submit */}
          <div className="form-submit">
            <button type="submit" className="btn btn--primary">
              📚 Add Book to Library
            </button>
          </div>

        </form>
      </div>

      {/* ── Success toast notification ── */}
      {showToast && (
        <div className="toast" role="status" aria-live="polite">
          ✅ Book added successfully! Redirecting…
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} <span>LibraVault</span></p>
      </footer>
    </main>
  );
}
