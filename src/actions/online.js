import api from '../api';

export const ONLINE_DATA = 'ONLINE_DATA';

export function onlineDataAction() {
  return async (dispatch) => {
    try {
      const response = await api.onlineData();
      const data = await response.json();
      return dispatch({
        type: ONLINE_DATA,
        onlineData: {
          datas: data,
          errMsg: '',
        },
      });
    } catch (error) {
      return dispatch({
        type: ONLINE_DATA,
        onlineData: {
          datas: {},
          errMsg: error,
        },
      });
    }
  };
}
