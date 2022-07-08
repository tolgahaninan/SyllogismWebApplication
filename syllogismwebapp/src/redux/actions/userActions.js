import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getUsersSuccess(jsonResponse) {
  return { type: actionTypes.GET_USERS_SUCCESS, payload: jsonResponse };
}

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/admin/user/read`);
    dispatch({
      type: actionTypes.GET_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export function getUserSuccess(jsonResponse) {
  return { type: actionTypes.GET_USER_SUCCESS, payload: jsonResponse };
}

export const getUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/user/profile/read`);
    dispatch({
      type: actionTypes.GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USER_ERROR,
      payload: console.log(e),
    });
  }
};

