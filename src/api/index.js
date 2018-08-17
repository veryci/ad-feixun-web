// import fetch from 'cross-fetch';
import 'whatwg-fetch';
import users from './users';
import * as dashboard from './dashboard';


const initAuth = () => fetch('/api/users/auth', {
  credentials: 'same-origin',
}).then((res) => {
  if (res.status === 200) return res.json();
  return res.text();
}).catch(error => console.error(error));

const fetchData = () => fetch('/api/data', {
  credentials: 'same-origin',
});

export default {
  initAuth,
  fetchData,
  ...users,
  ...dashboard,
};
