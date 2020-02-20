import React from "react";
import { Link } from "react-router-dom";

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
          <a
            className="btn btn-danger"
            href="#"
            onClick={() => {
              deleteExpense(expense._id);
            }}
          >
            Delete
          </a>
        </div>
      </td>
    </tr>
  );
};

export default Expense;
