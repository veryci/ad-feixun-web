import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { user, users } from './user';
import { SET_DATA } from '../actions';
import {
  dashboard, dashboardnew,
  flow, view, miss, uuid, vc, luyouqi, uuidActive,
} from './dashboard';
import onlineData from './online';
import dailyActive from './dailyActive';


export const data = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === SET_DATA) {
    return action.data;
  }
  return state;
};

export default combineReducers({
  user,
  data,
  users,
  dashboard,
  dashboardnew,
  flow,
  view,
  miss,
  uuid,
  uuidActive,
  vc,
  luyouqi,
  onlineData,
  dailyActive,
  router: routerReducer,
});
