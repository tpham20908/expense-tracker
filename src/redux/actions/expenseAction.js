import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES
} from "./types";

export const addExpense = expense => {
  return {
    type: ADD_EXPENSE,
    payload: expense
  };
};

export const deleteExpense = expenseId => {
  return {
    type: DELETE_EXPENSE,
    payload: expenseId
  };
};

export const editExpense = (expense, expenseId) => {
  return {
    type: EDIT_EXPENSE,
    payload: { editingExpense: expense, editingExpenseId: expenseId }
  };
};

export const setExpenses = expenseList => {
  return {
    type: SET_EXPENSES,
    payload: expenseList
  };
};
