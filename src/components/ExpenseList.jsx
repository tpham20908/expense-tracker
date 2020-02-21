import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

import { apiEndpoint } from "../constants";
import Expense from "./Expense";
import * as expenseActions from "../redux/actions/expenseAction";

const ExpenseList = props => {
  const { expenses, deletingExpense, setExpenses } = props;

  useEffect(() => {
    axios
      .get(`${apiEndpoint}/expenses`)
      .then(res => setExpenses(res.data))
      .catch(err => console.log("Error: " + err));
  }, [setExpenses]);

  const expenseList = () =>
    expenses.map((expense, id) => (
      <Expense expense={expense} deleteExpense={deleteExpense} key={id} />
    ));

  const deleteExpense = id => {
    deletingExpense(id);

    axios
      .delete(`${apiEndpoint}/expenses/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));
  };

  const getSubTotal = () =>
    expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <h3>Expense Tracker</h3>
      <div className="float-left">
        <p>
          The sub-total of expenses is: {parseFloat(getSubTotal()).toFixed(2)} $
        </p>
        <p>The total with taxes is {(getSubTotal() * 1.15).toFixed(2)} $</p>
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

const mapStateToProps = ({ expenses }) => ({ expenses });

const mapDispatchToProps = dispatch => ({
  deletingExpense: expenseId =>
    dispatch(expenseActions.deleteExpense(expenseId)),
  setExpenses: expenseList => dispatch(expenseActions.setExpenses(expenseList))
});

ExpenseList.propTypes = {
  expenses: PropTypes.array,
  deletingExpense: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
