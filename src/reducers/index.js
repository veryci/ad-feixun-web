import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { user, users } from './user';
import { vccps } from './vccp';
import { SET_DATA } from '../actions';
import {
  dashboard, dashboardnew,
  flow, view, miss, uuid, vc, luyouqi, uuidActive,
} from './dashboard';
import {
  analyzeTime,
  analyzeBrowser,
  analyzeDevice,
  analyzeMissSize,
  analyzeSize,
  analyzeUuid,
  analyzeHost,
  analyzeArea,
  analyzeSizeOs
} from './analyze';
import {
  editDataList,
}from './editData';

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
  vccps,
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
  analyzeTime,
  analyzeBrowser,
  analyzeDevice,
  analyzeMissSize,
  analyzeSize,
  analyzeArea,
  analyzeUuid,
  analyzeHost,
  analyzeSizeOs,
  editDataList,
  router: routerReducer,
});
