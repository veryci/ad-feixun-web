import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import onlineData from './online';
import dailyActive from './dailyActive';

export default combineReducers({
  onlineData,
  dailyActive,
  router: routerReducer,
});
