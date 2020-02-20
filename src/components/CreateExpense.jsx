import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import { apiEndpoint } from "../constants";
import { addExpense } from "../redux/actions/expenseAction";

const CreateExpense = props => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const { addExpense, history } = props;

  const onSubmit = async e => {
    e.preventDefault();

    const expense = { amount, date, description };

    addExpense(expense);

    await axios
      .post(`${apiEndpoint}/expenses/add`, expense)
      .then(res => console.log(res.data))
      .catch(err => console.error("Error: " + err));

    history.push("/");
  };

  return (
    <div>
      <h3>Add New Expense</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount: </label>
          <input
            type="number"
            required
            className="form-control"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              className="form-control"
              selected={date}
              onChange={selectedDate => setDate(selectedDate)}
            />
          </div>
        </div>

        <div className="form-group">
          <Link to={"/"} className="btn btn-secondary mr-2">
            Cancel
          </Link>
          <input
            type="submit"
            value="Add New Expense"
            className="btn btn-success"
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense))
});

CreateExpense.propTypes = {
  history: PropTypes.object.isRequired,
  addExpense: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(CreateExpense);
