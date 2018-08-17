import api from '../api';

export const DAILY_ACTIVE = 'DAILY_ACTIVE';

export function dailyDataAction() {
  return async (dispatch) => {
    try {
      const response = await api.dailyActiveData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: DAILY_ACTIVE,
          dailyActiveData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: DAILY_ACTIVE,
        dailyActiveData: {
          datas: {},
          errMsg: error,
        },
      });
    }
  };
}
