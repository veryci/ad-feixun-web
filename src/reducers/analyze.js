import {
  ANALYZE_TIME,
  ANALYZE_BROWSER,
  ANALYZE_DEVICE,
  ANALYZE_MISSSIZE,
  ANALYZE_SIZE,
  ANALYZE_HOST,
  ANALYZE_UUID,
  ANALYZE_AREA,
  ANALYZE_SIZE_OS
} from '../actions/analyze';

export const analyzeTime = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_TIME) {
    return action.analyzeTimeData;
  }
  return state;
};

export const analyzeBrowser = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_BROWSER) {
    return action.analyzBrowsereData;
  }
  return state;
};

export const analyzeDevice = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_DEVICE) {
    return action.analyzeDeviceData;
  }
  return state;
};

export const analyzeMissSize = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_MISSSIZE) {
    return action.analyzeMissSizeData;
  }
  return state;
};

export const analyzeSize = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_SIZE) {
    return action.analyzeSizeData;
  }
  return state;
};

export const analyzeHost = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_HOST) {
    return action.analyzeHostData;
  }
  return state;
};

export const analyzeUuid = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_UUID) {
    return action.analyzeUuidData;
  }
  return state;
};

export const analyzeArea = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_AREA) {
    return action.analyzeAreaData;
  }
  return state;
};

export const analyzeSizeOs = (state = {
  datas: [],
  errMsg: '',
}, action) => {
  if (action.type === ANALYZE_SIZE_OS) {
    return action.analyzeSizeOsData;
  }
  return state;
};