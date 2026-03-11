// ──────────────────────────────────────────────────────────────────────
//  App.jsx — Root component: sets up React Router routes
//
//  Route structure:
//    /                → Home
//    /browse-books    → BrowseBooks (all books)
//    /books/:category → BrowseBooks (filtered by category)
//    /book/:id        → BookDetails
//    /add-book        → AddBook
//    *                → NotFound (404)
//
//  The Navbar is shared across all routes EXCEPT NotFound,
//  achieved via a layout wrapper route.
// ──────────────────────────────────────────────────────────────────────

import { Routes, Route, Outlet } from "react-router-dom";
import Navbar      from "./components/Navbar";
import Home        from "./pages/Home";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetails from "./pages/BookDetails";
import AddBook     from "./pages/AddBook";
import NotFound    from "./pages/NotFound";

// ── Layout with Navbar ────────────────────────────────────────────────
// All main pages share this wrapper; NotFound bypasses it.
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Child routes render here */}
    </>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* ── Routes that include the Navbar ── */}
      <Route element={<MainLayout />}>
        <Route path="/"                  element={<Home />} />
        <Route path="/browse-books"      element={<BrowseBooks />} />
        <Route path="/books/:category"   element={<BrowseBooks />} />
        <Route path="/book/:id"          element={<BookDetails />} />
        <Route path="/add-book"          element={<AddBook />} />
      </Route>

      {/* ── 404 — no Navbar rendered here ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
