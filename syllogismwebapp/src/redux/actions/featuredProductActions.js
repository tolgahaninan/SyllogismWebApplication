import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getFeaturedProductsSuccess(jsonResponse) {
  return { type: actionTypes.GET_FEATURED_PRODUCTS_SUCCESS, payload: jsonResponse };
}

export const getFeaturedProducts = () => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/products/featured/read`)
      dispatch( {
          type: actionTypes.GET_FEATURED_PRODUCTS_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.FEATURED_PRODUCTS_ERROR,
          payload: console.log(e),
      })
  }

}