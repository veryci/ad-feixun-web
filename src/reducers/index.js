import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import onlineData from './online';
import dailyActive from './dailyActive';
import regionData from './region';

export default combineReducers({
  onlineData,
  dailyActive,
  regionData,
  router: routerReducer,
});
