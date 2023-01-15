import { USER_INFO, USER_EXPENSES, SAVE_CURRENCYS, DELETE_EXPENSE,
  CHANGE_EXPENSE, EDIT_EXPENSE } from './actionTypes';
// Coloque aqui suas actions
export const saveUserInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const saveUserExpense = (payload) => ({
  type: USER_EXPENSES,
  payload,
});

export const saveCurrencys = (payload) => ({
  type: SAVE_CURRENCYS,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const changeExpense = (payload) => ({
  type: CHANGE_EXPENSE,
  payload,
});

export const fetchCurrencys = (payload) => async (dispatch) => {
  const currencies = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((promisse) => promisse.json())
    .then((currencys) => currencys);
  delete currencies.USTD;
  dispatch(saveUserExpense({ ...payload, exchangeRates: currencies }));
};
