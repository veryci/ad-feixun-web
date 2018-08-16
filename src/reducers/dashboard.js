import {
  SET_DASHBOARD, SET_DASHBOARD_NEW,
  SET_FLOW, SET_VIEW, SET_MISS, SET_UUID, SET_VC, SET_ROUTER,
} from '../actions/dashboard';

export const dashboard = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === SET_DASHBOARD) {
    return action.dashboard;
  }
  return state;
};

export const dashboardnew = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === SET_DASHBOARD_NEW) {
    return action.dashboardnew;
  }
  return state;
};

export const flow = (state = {
  datas: [0, 0, 0],
  errMsg: '',
}, action) => {
  if (action.type === SET_FLOW) {
    return action.flow;
  }
  return state;
};

export const view = (state = {
  datas: [0, 0, 0],
  errMsg: '',
}, action) => {
  if (action.type === SET_VIEW) {
    return action.view;
  }
  return state;
};

export const miss = (state = {
  datas: [0, 0, 0],
  errMsg: '',
}, action) => {
  if (action.type === SET_MISS) {
    return action.miss;
  }
  return state;
};

export const uuidActive = (state = {
  datas: [0, 0, 0],
  errMsg: '',
}, action) => {
  if (action.type === SET_UUID) {
    return action.uuid;
  }
  return state;
};

export const uuid = (state = {
  datas: [0, 0, 0],
  errMsg: '',
}, action) => {
  if (action.type === SET_UUID) {
    return action.uuid;
  }
  return state;
};

export const vc = (state = {
  datas: {},
  errMsg: '',
}, action) => {
  if (action.type === SET_VC) {
    return action.vc;
  }
  return state;
};

export const luyouqi = (state = {
  datas: {},
  errMsg: '',
}, action) => {
  if (action.type === SET_ROUTER) {
    return action.luyouqi;
  }
  return state;
};

