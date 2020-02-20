import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { apiEndpoint } from "../constants";
import Expense from "./Expense";

const ExpenseList = () => {
  // TODO: Redux store
  const [expenses, setExpenses] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiEndpoint}/expenses`)
      .then(res => {
        const expenseList = res.data;
        const totalAmount = expenseList.reduce(
          (accAmount, expense) => accAmount + expense.amount,
          0
        );

        setExpenses(expenseList);
        setSubTotal(totalAmount);
      })
      .catch(err => console.log("Error: " + err));
  }, []);

  const expenseList = () =>
    expenses.map(expense => (
      <Expense
        expense={expense}
        deleteExpense={deleteExpense}
        key={expense._id}
      />
    ));

  const deleteExpense = id => {
    // update state
    // TODO: update Redux store
    const newExpenses = expenses.filter(expense => expense._id !== id);
    setExpenses(newExpenses);

    // update db
    axios
      .delete(`${apiEndpoint}/expenses/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));
  };

  return (
    <div>
      <h3>Expense Tracker</h3>
      <div className="float-left">
        <p>
          The sub-total of expenses is: {parseFloat(subTotal).toFixed(2)} ${" "}
        </p>
        <p>The total with taxes is {(subTotal * 1.15).toFixed(2)} $</p>
      </div>
      <Link to={"/create"} className="btn btn-success float-right">
        Add new expense
      </Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Taxes (15%)</th>
            <th>Date</th>
            <th>{""}</th>
          </tr>
        </thead>
        <tbody>{expenseList()}</tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
