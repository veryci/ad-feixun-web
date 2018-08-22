import api from '../api';

export const REGION_DATA = 'REGION_DATA';

export function regionDataAction() {
  return async (dispatch) => {
    try {
      const response = await api.regionData();
      const body = await response.json();
      return dispatch({
        type: REGION_DATA,
        regionData: {
          datas: body.data,
          errMsg: '',
        },
      });
    } catch (error) {
      return dispatch({
        type: REGION_DATA,
        regionData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}
