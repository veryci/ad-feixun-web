import {
  GET_EDIT_LIST,
} from '../actions/editData';

export const editDataList = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === GET_EDIT_LIST) {
    return action.editDataList;
  }
  return state;
};