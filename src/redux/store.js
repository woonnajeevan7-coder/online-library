// ──────────────────────────────────────────────────────────
//  store.js — Configure and export the central Redux store
// ──────────────────────────────────────────────────────────

import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice";

const store = configureStore({
  reducer: {
    books: booksReducer, // Namespaced under "books"
  },
});

export default store;
