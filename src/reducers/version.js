import { GET_VERSION } from '../actions/version';

const versionData = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === GET_VERSION) {
    return action.versionData;
  }
  return state;
};

export default versionData;
