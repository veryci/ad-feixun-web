import { push } from 'react-router-redux';
import api from '../api';

export const SET_USER = 'SET_USER';
export const SET_USERS = 'SET_USERS';
export const SET_VCCP = 'SET_VCCP';
export const SET_DATA = 'SET_DATA';

export function logoutAction() {
  return async (dispatch) => {
    const user = {};
    try {
      await api.logout();
      dispatch({
        type: SET_USER,
        user,
      });
      dispatch(push('/login'));
      return;
      // window.location.href = '/';
    } catch (err) {
      alert(err.message);
      dispatch({
        type: SET_USER,
        user: {
          errMsg: 'unkown',
        },
      });
      dispatch(push('/login'));
    }
  };
}

export function loginAction({ mobile, password }) {
  return async (dispatch) => {
    let user = {};
    let msg = '';
    try {
      const response = await api.login({ mobile, password });
      if (response.status === 200) {
        user = await response.json();
        dispatch(push('/'));
        dispatch({
          type: SET_USER,
          user,
        });
        return;
      }
      msg = await response.text();
      user.errMsg = msg;
      dispatch({
        type: SET_USER,
        user,
      });
      return;
    } catch (err) {
      dispatch({
        type: SET_USER,
        user: {
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function dataAction() {
  return async (dispatch) => {
    let data = {};
    let msg = '';
    try {
      const response = await api.fetchData();
      if (response.status === 200) {
        data = await response.json();
        dispatch({
          type: SET_DATA,
          data,
        });
        return;
      }
      msg = await response.text();
      data.errMsg = msg;
      dispatch({
        type: SET_DATA,
        data,
      });
      return;
    } catch (err) {
      dispatch({
        type: SET_DATA,
        data: {
          errMsg: 'unkown',
        },
      });
    }
  };
}
