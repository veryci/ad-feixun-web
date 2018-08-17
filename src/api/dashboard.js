import 'whatwg-fetch';
// import moment from 'moment';

export const dashboardDatas = () => fetch('/api/dashboard', {
  method: 'GET',
  credentials: 'same-origin',
});

export const dashboardNewDatas = () => fetch('/api/dashboard/newcp', {
  method: 'GET',
  credentials: 'same-origin',
});

export const flowDatas = () => fetch('/api/dashboard/new', {
  method: 'GET',
  credentials: 'same-origin',
});

export const viewDatas = () => fetch('/api/dashboard/view', {
  method: 'GET',
  credentials: 'same-origin',
});

export const missDatas = () => fetch('/api/dashboard/miss', {
  method: 'GET',
  credentials: 'same-origin',
});

export const uuidActiveDatas = () => fetch('/api/active', {
  method: 'POST',
  credentials: 'same-origin',
});

export const uuidDatas = () => fetch('/api/dashboard/newuuser', {
  method: 'GET',
  credentials: 'same-origin',
});

export const vcDatas = () => fetch('/api/vc', {
  method: 'GET',
  credentials: 'same-origin',
});

export const luyouqiDatas = () => fetch('/api/luyouqi', {
  method: 'GET',
  credentials: 'same-origin',
});

