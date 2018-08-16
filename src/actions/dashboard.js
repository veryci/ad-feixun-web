import api from '../api';

// export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD';
export const SET_DASHBOARD = 'SET_DASHBOARD';
export const SET_DASHBOARD_NEW = 'SET_DASHBOARD_NEW';
export const SET_FLOW = 'SET_FLOW';
export const SET_VIEW = 'SET_VIEW';
export const SET_MISS = 'SET_MISS';
export const SET_UUID = 'SET_UUID';
export const SET_VC = 'SET_VC';
export const SET_ROUTER = 'SET_ROUTER';

export function dashboardActon() {
  return async (dispatch) => {
    try {
      const response = await api.dashboardDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_DASHBOARD,
          dashboard: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_DASHBOARD,
        dashboard: {
          datas: [0, 0, 0],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_DASHBOARD,
        dashboard: {
          datas: [0, 0, 0],
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function dashboardNewAction() {
  return async (dispatch) => {
    try {
      const response = await api.dashboardNewDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_DASHBOARD_NEW,
          dashboardnew: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_DASHBOARD_NEW,
        dashboardnew: {
          datas: [0, 0, 0],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_DASHBOARD_NEW,
        dashboardnew: {
          datas: [0, 0, 0],
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function flowActon() {
  return async (dispatch) => {
    try {
      const response = await api.flowDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_FLOW,
          flow: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_FLOW,
        flow: {
          datas: [0, 0, 0],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_FLOW,
        flow: {
          datas: [0, 0, 0],
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function viewActon() {
  return async (dispatch) => {
    try {
      const response = await api.viewDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_VIEW,
          view: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_VIEW,
        view: {
          datas: [0, 0, 0],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_VIEW,
        view: {
          datas: [0, 0, 0],
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function missActon() {
  return async (dispatch) => {
    try {
      const response = await api.missDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_MISS,
          miss: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_MISS,
        miss: {
          datas: [0, 0, 0],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_MISS,
        miss: {
          datas: [0, 0, 0],
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function uuidActon() {
  return async (dispatch) => {
    try {
      const response = await api.uuidDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_UUID,
          uuid: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_UUID,
        uuid: {
          datas: [0, 0, 0],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_UUID,
        uuid: {
          datas: [0, 0, 0],
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function uuidActiveActon() {
  return async (dispatch) => {
    try {
      const response = await api.uuidActiveDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_UUID,
          uuid: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_UUID,
        uuid: {
          datas: [0, 0, 0],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_UUID,
        uuid: {
          datas: [0, 0, 0],
          errMsg: 'unkown',
        },
      });
    }
  };
}


export function vcActon() {
  return async (dispatch) => {
    try {
      const response = await api.vcDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_VC,
          vc: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_VC,
        vc: {
          datas: [],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_VC,
        vc: {
          datas: [],
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function luyouqiActon() {
  return async (dispatch) => {
    try {
      const response = await api.luyouqiDatas();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: SET_ROUTER,
          luyouqi: {
            datas,
            errMsg: '',
          },
        });
      }
      const msg = await response.text();
      return dispatch({
        type: SET_ROUTER,
        luyouqi: {
          datas: [],
          errMsg: msg,
        },
      });
    } catch (error) {
      return dispatch({
        type: SET_ROUTER,
        luyouqi: {
          datas: [],
          errMsg: 'unkown',
        },
      });
    }
  };
}
