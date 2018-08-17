import api from '../api';

export const ONLINE_DATA = 'ONLINE_DATA';

export function onlineDataAction() {
  return async (dispatch) => {
    try {
      const response = await api.onlineData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ONLINE_DATA,
          onlineData: {
            datas,
            errMsg: '',
          },
        });
      }
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
