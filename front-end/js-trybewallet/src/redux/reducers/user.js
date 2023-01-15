// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_INFO } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_INFO:
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};

export default user;
