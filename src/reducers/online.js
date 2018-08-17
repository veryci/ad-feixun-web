import { ONLINE_DATA } from '../actions/online';

const onlineData = (state = {
  datas: {},
  errMsg: '',
}, action) => {
  if (action.type === ONLINE_DATA) {
    return action.onlineData;
  }
  return state;
};

export default onlineData;
