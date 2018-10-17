import api from '../api';

export const DAILY_ACTIVE = 'DAILY_ACTIVE';

export function dailyDataAction(time) {
  return async (dispatch) => {
    try {
      const response = await api.dailyActive(time);
      if (response.status === 200) {
        const body = await response.json();
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
