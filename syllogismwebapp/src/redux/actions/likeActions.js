import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getLikesSuccess(jsonResponse) {
  return { type: actionTypes.GET_LIKES_SUCCESS, payload: jsonResponse };
}

export function getLikesByProductSuccess(jsonResponse) {
  return { type: actionTypes.GET_LIKES_BY_PRODUCT_SUCCESS, payload: jsonResponse };
}

export const getLikesByProduct = (product) => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/product/like/read/${product}`)
      dispatch( {
          type: actionTypes.GET_LIKES_BY_PRODUCT_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.LIKES_BY_PRODUCT_ERROR,
          payload: console.log(e),
      })
  }

}

export function getLikesByUserSuccess(jsonResponse) {
  return { type: actionTypes.GET_LIKES_BY_USER_SUCCESS, payload: jsonResponse };
}

export const getLikesByUser = () => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/user/like/read`)
      dispatch( {
          type: actionTypes.GET_LIKES_BY_USER_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.LIKES_BY_USER_ERROR,
          payload: console.log(e),
      })
  }

}