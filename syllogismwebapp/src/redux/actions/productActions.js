import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getProductsSuccess(jsonResponse) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: jsonResponse };
}

export const getProducts = () => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/admin/product/read`)
      dispatch( {
          type: actionTypes.GET_PRODUCTS_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.PRODUCTS_ERROR,
          payload: console.log(e),
      })
  }

}

export function getProductsByCategorySuccess(jsonResponse) {
  return { type: actionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS, payload: jsonResponse };
}

export const getProductsByCategory = (category) => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/${category}/products`)
      dispatch( {
          type: actionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.PRODUCTS_BY_CATEGORY_ERROR,
          payload: console.log(e),
      })
  }

}


export function getProductsByIdSuccess(jsonResponse) {
  return { type: actionTypes.GET_PRODUCTS_BY_ID_SUCCESS, payload: jsonResponse };
}

export const getProductsById = (id) => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/products/${id}`)
      dispatch( {
          type: actionTypes.GET_PRODUCTS_BY_ID_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.PRODUCTS_BY_ID_ERROR,
          payload: console.log(e),
      })
  }

}

