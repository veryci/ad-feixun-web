import api from '../api';

export const DAILY_ACTIVE = 'DAILY_ACTIVE';

export function dailyDataAction(obj) {
  return async (dispatch) => {
    try {
      const response = await api.dailyActive(obj);
      const body = await response.json();
      if (response.status === 200) {
        return dispatch({
          type: DAILY_ACTIVE,
          dailyActiveData: {
            datas: body,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: DAILY_ACTIVE,
        dailyActiveData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}
