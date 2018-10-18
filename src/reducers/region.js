import { REGION_DATA } from '../actions/region';

const regionData = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === REGION_DATA) {
    return action.regionData;
  }
  return state;
};

export default regionData;
