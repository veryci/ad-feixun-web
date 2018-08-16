// import fetch from 'cross-fetch';
import 'whatwg-fetch';
import users from './users';
import * as dashboard from './dashboard';
import * as analyze from './analyze';
import * as editData from './editData';


const initAuth = () => fetch('/api/users/auth', {
  credentials: 'same-origin',
}).then((res) => {
  if (res.status === 200) return res.json();
  return res.text();
}).catch(error => console.error(error));

const fetchData = () => fetch('/api/data', {
  credentials: 'same-origin',
});

// console.log(index);
export default {
  initAuth,
  fetchData,
  ...users,
  ...dashboard,
  ...analyze,
  ...editData,
};
