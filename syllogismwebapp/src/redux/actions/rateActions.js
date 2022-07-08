import * as actionTypes from "./actionTypes";
import axios from "axios";



export function getRatesByProductSuccess(jsonResponse) {
  return { type: actionTypes.GET_RATES_BY_PRODUCT_SUCCESS, payload: jsonResponse };
}

export const getRatesByProduct = (product) => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/product/rate/read/${product}`)
      dispatch( {
          type: actionTypes.GET_RATES_BY_PRODUCT_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.RATES_BY_PRODUCT_ERROR,
          payload: console.log(e),
      })
  }

}