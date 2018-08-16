import api from '../api';

export const GET_EDIT_LIST = 'GET_EDIT_LIST';

export function getEditListActon() {
  return async (dispatch) => {
    try {
      const response = await api.getEditList();
      if (response.status === 200) {
        const datas = await response.json();
        return dispatch({
          type: GET_EDIT_LIST,
          editDataList: {
            datas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: GET_EDIT_LIST,
        editDataList: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

export function toEditDataActon(param, callback) {
  return async (dispatch, getState) => {
    const { editDataList } = getState();
    const { datas } = editDataList;
    try {
      let response;
      if (!param.id) {
        response = await api.toEditData(param);
      } else {
        response = await api.updateEditData(param);
      }
      if (response.status === 200) {
        const editInfo = await response.json();
        const newDatas = datas.map((data) => {
          if (param.id === data._id) {
            return {
              ...param,
              ...editInfo,
            };
          }
          return data;
        });
        if (!param.id) {
          newDatas.unshift({
            ...param,
            ...editInfo,
          });
        }
        if (callback) callback();
        return dispatch({
          type: GET_EDIT_LIST,
          editDataList: {
            datas: newDatas,
            errMsg: '',
          },
        });
      }
    } catch (error) {
      return dispatch({
        type: GET_EDIT_LIST,
        editDataList: {
          datas: [],
          errMsg: error,
        },
      });
    }
  };
}

