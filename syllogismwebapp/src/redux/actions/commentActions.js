import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getCommentsSuccess(jsonResponse) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: jsonResponse };
}

export const getComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product/comment/read/${id}`);
    dispatch({
      type: actionTypes.GET_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.COMMENTS_ERROR,
      payload: console.log(e),
    });
  }
};
