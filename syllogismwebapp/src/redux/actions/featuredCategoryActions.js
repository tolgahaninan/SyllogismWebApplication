import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getFeaturedCategoriesSuccess(jsonResponse) {
  return { type: actionTypes.GET_FEATURED_CATEGORIES_SUCCESS, payload: jsonResponse };
}

export const getFeaturedCategories = () => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/category/featured/read`)
      dispatch( {
          type: actionTypes.GET_FEATURED_CATEGORIES_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.FEATURED_CATEGORIES_ERROR,
          payload: console.log(e),
      })
  }

}