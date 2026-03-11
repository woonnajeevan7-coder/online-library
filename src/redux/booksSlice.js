// ─────────────────────────────────────────────────────────────
//  booksSlice.js — Redux Toolkit slice for all book operations
// ─────────────────────────────────────────────────────────────

import { createSlice } from "@reduxjs/toolkit";
import { booksData } from "../data/booksData";

// ── Initial State ────────────────────────────────────────────
const initialState = {
  books: booksData,          // Pre-loaded with 15 seed books
  searchQuery: "",           // Live search filter string
};

// ── Slice Definition ─────────────────────────────────────────
const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
    // addBook: prepend a new book at the top of the list
    addBook(state, action) {
      const newBook = {
        ...action.payload,
        id: Date.now(),          // Unique numeric ID using timestamp
        popular: false,          // Newly added books are not popular by default
        cover: "",               // No cover image for user-added books
      };
      state.books.unshift(newBook); // Add at the beginning so it appears first
    },

    // setSearchQuery: update the search filter (used by SearchBar)
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

// ── Exports ───────────────────────────────────────────────────
export const { addBook, setSearchQuery } = booksSlice.actions;

// Selectors
export const selectAllBooks    = (state) => state.books.books;
export const selectSearchQuery = (state) => state.books.searchQuery;

// Derived selector: filter books by search query
export const selectFilteredBooks = (state) => {
  const query = state.books.searchQuery.toLowerCase();
  if (!query) return state.books.books;
  return state.books.books.filter(
    (b) =>
      b.title.toLowerCase().includes(query) ||
      b.author.toLowerCase().includes(query)
  );
};

export default booksSlice.reducer;
