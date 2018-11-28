import { combineReducers } from 'redux';
import onlineData from './online';
import dailyActive from './dailyActive';
import regionData from './region';
import versionData from './version';

export default combineReducers({
  onlineData,
  dailyActive,
  regionData,
  versionData,
});
