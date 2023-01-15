// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_EXPENSES, SAVE_CURRENCYS, DELETE_EXPENSE,
  CHANGE_EXPENSE, EDIT_EXPENSE } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  shouldEdit: false,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case SAVE_CURRENCYS:
    return {
      ...state,
      currencies: payload,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: payload,
      idToEdit: 0,
      shouldEdit: false,
    };

  case CHANGE_EXPENSE:
    return {
      ...state,
      idToEdit: payload,
      shouldEdit: true,
    };
  default:
    return state;
  }
};

export default wallet;
