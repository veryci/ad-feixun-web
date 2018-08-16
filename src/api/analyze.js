import 'whatwg-fetch';

export const analyzeTimeData = () => fetch('/api/analyze/time', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzBrowsereData = () => fetch('/api/analyze/browser', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzeDeviceData = () => fetch('/api/analyze/device', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzeMissSizeData = () => fetch('/api/analyze/missSize', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzeSizeData = () => fetch('/api/analyze/size', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzeSizeOsData = () => fetch('/api/analyze/size/os', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzeHostData = () => fetch('/api/analyze/host', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzeUuidData = () => fetch('/api/analyze/uuid', {
  method: 'GET',
  credentials: 'same-origin',
});

export const analyzeAreaData = () => fetch('/api/analyze/area', {
  method: 'GET',
  credentials: 'same-origin',
});
