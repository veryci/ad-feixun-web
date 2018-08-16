import { SET_USER, SET_USERS } from '../actions';

export const user = (state = {
  errMsg: '',
}, action) => {
  if (action.type === SET_USER) {
    return action.user;
  }
  return state;
};

export const users = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === SET_USERS) {
    return action.users;
  }
  return state;
};

