import api from '../api';

export const SET_USERS = 'SET_USERS';

export function fetchALLUser() {
  return async (dispatch) => {
    let datas = [];
    let msg = '';
    try {
      const response = await api.loadAllUser();
      if (response.status === 200) {
        datas = await response.json();
        return dispatch({
          type: SET_USERS,
          users: {
            datas,
            errMsg: msg,
          },
        });
      }
      msg = await response.text();
      return dispatch({
        type: SET_USERS,
        users: {
          datas,
          errMsg: msg,
        },
      });
    } catch (err) {
      return dispatch({
        type: SET_USERS,
        users: {
          datas,
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function editUser(user, cb) {
  return async (dispatch, getState) => {
    const { users } = getState();
    const { datas } = users;
    let msg = '';
    try {
      const response = await api.editUser(user);
      if (response.status === 200) {
        const userInfo = await response.json();
        const newDatas = datas.map((data) => {
          if (user._id === data._id) {
            return {
              ...user,
              ...userInfo,
            };
          }
          return data;
        });
        if (!user._id) {
          newDatas.push({
            ...user,
            ...userInfo,
          });
        }
        if (cb) cb();
        return dispatch({
          type: SET_USERS,
          users: {
            datas: newDatas,
            errMsg: msg,
          },
        });
      }
      msg = await response.text();
      return dispatch({
        type: SET_USERS,
        users: {
          datas,
          errMsg: msg,
        },
      });
    } catch (err) {
      return dispatch({
        type: SET_USERS,
        users: {
          datas,
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function delUser(user, cb) {
  return async (dispatch, getState) => {
    const { users } = getState();
    const { datas } = users;
    let msg = '';
    try {
      const response = await api.delUser(user);
      if (response.status === 200) {
        // const userInfo = await response.json();
        await response.json();
        const newDatas = [];
        datas.forEach((data) => {
          if (user._id !== data._id) {
            newDatas.push(data);
          }
        });
        if (cb) cb();
        return dispatch({
          type: SET_USERS,
          users: {
            datas: newDatas,
            errMsg: msg,
          },
        });
      }
      msg = await response.text();
      return dispatch({
        type: SET_USERS,
        users: {
          datas,
          errMsg: msg,
        },
      });
    } catch (err) {
      return dispatch({
        type: SET_USERS,
        users: {
          datas,
          errMsg: 'unkown',
        },
      });
    }
  };
}
