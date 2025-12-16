import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddBook from "./components/AddBook";
import BookUpdate from "./components/BookUpdate";
import DisplayBooks from "./components/DsplyBk_fncCompt";
import DeleteBook from "./components/Delete_Book";

function App() {
  return (
    <Router>
      <div className="container">
        <h2 className="text-center">Fashion Design Management</h2>

        <nav className="navbar navbar-expand-lg navbar-light bg-success">
          <Link to="/" className="navbar-brand">Add Design</Link>
          <Link to="/display" className="navbar-brand">Display Designs</Link>
        </nav>

        <Routes>
          <Route path="/" element={<AddBook />} />
          <Route path="/display" element={<DisplayBooks />} />
          <Route path="/edit/:id" element={<BookUpdate />} />
          <Route path="/delete/:id" element={<DeleteBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;