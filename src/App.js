import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateExpense from "./components/CreateExpense";
import EditExpense from "./components/EditExpense";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="mb-5">
        <Navbar />
      </div>
      <div className="container">
        <Route path="/" exact component={ExpenseList} />
        <Route path="/create" component={CreateExpense} />
        <Route path="/edit/:id" component={EditExpense} />
      </div>
    </Router>
  );
}

export default App;
