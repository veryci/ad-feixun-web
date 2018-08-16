import api from '../api';

import { SET_VCCP } from './index';

export function fetchALLVCCP() {
  return async (dispatch) => {
    let datas = [];
    let msg = '';
    try {
      const response = await api.loadAllVCCP();
      if (response.status === 200) {
        datas = await response.json();
        return dispatch({
          type: SET_VCCP,
          vccp: {
            datas,
            errMsg: msg,
          },
        });
      }
      msg = await response.text();
      return dispatch({
        type: SET_VCCP,
        vccp: {
          datas,
          errMsg: msg,
        },
      });
    } catch (err) {
      return dispatch({
        type: SET_VCCP,
        vccp: {
          datas,
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function editVCCP(vccp, cb) {
  return async (dispatch, getState) => {
    const { vccps } = getState();
    const { datas } = vccps;
    let msg = '';
    try {
      const response = await api.editVCCP(vccp);
      if (response.status === 200) {
        const newDatas = datas.map((data) => {
          if (vccp._id === data._id) {
            return {
              ...vccp,
            };
          }
          return data;
        });
        if (cb) cb();
        return dispatch({
          type: SET_VCCP,
          vccp: {
            datas: newDatas,
            errMsg: msg,
          },
        });
      }
      msg = await response.text();
      return dispatch({
        type: SET_VCCP,
        vccp: {
          datas,
          errMsg: msg,
        },
      });
    } catch (err) {
      return dispatch({
        type: SET_VCCP,
        vccp: {
          datas,
          errMsg: 'unkown',
        },
      });
    }
  };
}

export function addVCCP(vccp, cb) {
  return async (dispatch, getState) => {
    const { vccps } = getState();
    const { datas } = vccps;
    let msg = '';
    try {
      const response = await api.addVCCP(vccp);
      if (response.status === 200) {
        const vccpInfo = await response.json();
        const newDatas = datas.map((data) => {
          if (vccp._id === data._id) {
            return {
              ...vccp,
              ...vccpInfo,
            };
          }
          return data;
        });
        if (!vccp._id) {
          newDatas.push({
            ...vccp,
            ...vccpInfo,
          });
        }
        if (cb) cb();
        return dispatch({
          type: SET_VCCP,
          vccp: {
            datas: newDatas,
            errMsg: msg,
          },
        });
      }
      msg = await response.text();
      return dispatch({
        type: SET_VCCP,
        vccp: {
          datas,
          errMsg: msg,
        },
      });
    } catch (err) {
      return dispatch({
        type: SET_VCCP,
        vccp: {
          datas,
          errMsg: 'unkown',
        },
      });
    }
  };
}

// export function delUser(user, cb) {
//   return async (dispatch, getState) => {
//     const { users } = getState();
//     const { datas } = users;
//     let msg = '';
//     try {
//       const response = await api.delUser(user);
//       if (response.status === 200) {
//         // const userInfo = await response.json();
//         await response.json();
//         const newDatas = [];
//         datas.forEach((data) => {
//           if (user._id !== data._id) {
//             newDatas.push(data);
//           }
//         });
//         if (cb) cb();
//         return dispatch({
//           type: SET_USERS,
//           users: {
//             datas: newDatas,
//             errMsg: msg,
//           },
//         });
//       }
//       msg = await response.text();
//       return dispatch({
//         type: SET_USERS,
//         users: {
//           datas,
//           errMsg: msg,
//         },
//       });
//     } catch (err) {
//       return dispatch({
//         type: SET_USERS,
//         users: {
//           datas,
//           errMsg: 'unkown',
//         },
//       });
//     }
//   };
// }
