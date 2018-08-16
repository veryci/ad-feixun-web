import api from '../api';


export const ANALYZE_TIME = 'ANALYZE_TIME';
export const ANALYZE_BROWSER = 'ANALYZE_BROWSER';
export const ANALYZE_DEVICE = 'ANALYZE_DEVICE';
export const ANALYZE_MISSSIZE = 'ANALYZE_MISSSIZE';
export const ANALYZE_SIZE = 'ANALYZE_SIZE';
export const ANALYZE_HOST = 'ANALYZE_HOST';
export const ANALYZE_UUID = 'ANALYZE_UUID';
export const ANALYZE_AREA = 'ANALYZE_AREA';
export const ANALYZE_SIZE_OS = 'ANALYZE_SIZE_OS';


export function analyzeTimeActon() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeTimeData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_TIME,
          analyzeTimeData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_TIME,
        analyzeTimeData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeBrowserActon() {
  return async (dispatch) => {
    try {
      const response = await api.analyzBrowsereData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_BROWSER,
          analyzBrowsereData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_BROWSER,
        analyzBrowsereData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeDeviceAction() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeDeviceData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_DEVICE,
          analyzeDeviceData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_DEVICE,
        analyzeDeviceData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeMissSizeAction() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeMissSizeData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_MISSSIZE,
          analyzeMissSizeData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_MISSSIZE,
        analyzeMissSizeData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeSizeActon() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeSizeData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_SIZE,
          analyzeSizeData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_SIZE,
        analyzeSizeData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeHostAction() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeHostData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_HOST,
          analyzeHostData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_HOST,
        analyzeHostData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeUuidAction() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeUuidData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_UUID,
          analyzeUuidData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_UUID,
        analyzeUuidData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeAreaAction() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeAreaData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_AREA,
          analyzeAreaData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_AREA,
        analyzeAreaData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function analyzeSizeOsAction() {
  return async (dispatch) => {
    try {
      const response = await api.analyzeSizeOsData();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: ANALYZE_SIZE_OS,
          analyzeSizeOsData: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: ANALYZE_SIZE_OS,
        analyzeSizeOsData: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}
