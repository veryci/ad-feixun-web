import { DAILY_ACTIVE } from '../actions/dailyActive';

const dailyActive = (state = {
  datas: {},
  errMsg: '',
}, action) => {
  if (action.type === DAILY_ACTIVE) {
    return action.dailyActiveData;
  }
  return state;
};

export default dailyActive;
