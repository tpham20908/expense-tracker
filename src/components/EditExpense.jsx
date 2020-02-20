import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import { apiEndpoint } from "../constants";
import { editExpense } from "../redux/actions/expenseAction";

const EditExpense = ({ editExpense, history, match }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const expenseId = match.params.id;

  useEffect(() => {
    axios
      .get(`${apiEndpoint}/expenses/${expenseId}`)
      .then(res => {
        const { description, amount, date } = res.data;

        setDescription(description);
        setAmount(amount);
        setDate(new Date(date));
      })
      .catch(err => console.log("Error: " + err));
  }, [expenseId]);

  const onSubmit = async e => {
    e.preventDefault();

    const expense = { description, amount, date };

    editExpense(expense, expenseId);

    await axios
      .post(`${apiEndpoint}/expenses/update/${expenseId}`, expense)
      .then(res => console.log(res.data))
      .catch(err => console.error("Error: " + err));

    history.push("/");
  };

  return (
    <div>
      <h3>Edit Expense</h3>

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
          <input type="submit" value="Save" className="btn btn-success" />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  editExpense: (expense, expenseId) => dispatch(editExpense(expense, expenseId))
});

EditExpense.propTypes = {
  editExpense: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(EditExpense);
