import 'whatwg-fetch';

export const getEditList = () => fetch('/api/view/system/list', {
  method: 'GET',
  credentials: 'same-origin',
});

export const toEditData = data => fetch('/api/view/system/add', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export const updateEditData = data => fetch('/api/view/system/update', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
