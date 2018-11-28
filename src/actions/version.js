import api from '../api';

export const GET_VERSION = 'GET_VERSION';

export function versionDataAction() {
  return async (dispatch) => {
    try {
      const response = await api.version();
      const body = await response.json();
      if (response.status === 200) {
        return dispatch({
          type: GET_VERSION,
          versionData: {
            datas: body,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: GET_VERSION,
        versionData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}
