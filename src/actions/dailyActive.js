import api from '../api';

export const DAILY_ACTIVE = 'DAILY_ACTIVE';

export function dailyDataAction() {
  return async (dispatch) => {
    try {
      const response = await api.dailyActive();
      if (response.status === 200) {
        const res = await response.json();
        return dispatch({
          type: DAILY_ACTIVE,
          dailyActiveData: {
            datas: res.data,
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
