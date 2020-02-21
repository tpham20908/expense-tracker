import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import formatDate from "../utils/formatDate";

const Expense = ({ expense, deleteExpense }) => {
  const { description, amount, date } = expense;
  const tax = (amount * 0.15).toFixed(2);

  return (
    <tr>
      <td>{description}</td>
      <td>{amount}</td>
      <td>{tax}</td>
      <td>{formatDate(date)}</td>
      <td>
        <div className="float-right">
          <Link to={`/edit/${expense._id}`} className="btn btn-warning mr-2">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteExpense(expense._id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

Expense.propTypes = {
  expense: PropTypes.object,
  deleteExpense: PropTypes.func.isRequired
};

export default Expense;
