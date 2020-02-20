import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.payload];

    case DELETE_EXPENSE:
      return state.filter(expense => expense._id !== action.payload);

    case EDIT_EXPENSE:
      return state.map(expense => {
        const { editingExpense, editingExpenseId } = action.payload;
        return expense._id !== editingExpenseId
          ? expense
          : { ...expense, ...editingExpense };
      });

    case SET_EXPENSES:
      return [...action.payload];

    default:
      return state;
  }
}
