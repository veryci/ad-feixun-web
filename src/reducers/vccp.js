import { SET_VCCP } from '../actions';

export const vccps = (state = {
  errMsg: '',
  datas: [],
}, action) => {
  if (action.type === SET_VCCP) {
    return action.vccp;
  }
  return state;
};

export const vc = 'cc';

