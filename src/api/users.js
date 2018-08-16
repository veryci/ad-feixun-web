import 'whatwg-fetch';

/**
 * login
 * @param {Object[]} loginInfo - 登录信息
 * @param {string} loginInfo[].mobile - mobile
 * @param {string} loginInfo[].password - password
 */
const login = loginInfo => fetch('/api/users/login', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(loginInfo),
});

const logout = () => fetch('/api/users/logout', {
  method: 'POST',
  credentials: 'same-origin',
});

const create = userInfo => fetch('/api/users/create', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userInfo),
});

const loadAllUser = () => fetch('/api/users/all', {
  method: 'GET',
  credentials: 'same-origin',
});

const editUser = user => fetch('/api/users/edit', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

const delUser = user => fetch('/api/users/edit', {
  method: 'DELETE',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

const loadAllVCCP = () => fetch('/api/vccp', {
  method: 'GET',
  credentials: 'same-origin',
});

const editVCCP = vccp => fetch('/api/vccp', {
  method: 'PUT',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(vccp),
});

const addVCCP = vccp => fetch('/api/vccp', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(vccp),
});

export default {
  login,
  logout,
  create,
  loadAllUser,
  editUser,
  delUser,
  loadAllVCCP,
  editVCCP,
  addVCCP,
};
