import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    <div className="container">
      <Link to="/" className="navbar-brand">
        Expense Tracker
      </Link>
    </div>
  </nav>
);

export default Navbar;
