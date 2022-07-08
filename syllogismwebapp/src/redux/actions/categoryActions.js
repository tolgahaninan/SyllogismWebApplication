import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getCategoriesSuccess(jsonResponse) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: jsonResponse };
}

export const getCategories = () => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/category/read`)
      dispatch( {
          type: actionTypes.GET_CATEGORIES_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.CATEGORIES_ERROR,
          payload: console.log(e),
      })
  }

}
export function changeCategory(category){
  return {type:actionTypes.CHANGE_CATEGORY,payload:category}
}