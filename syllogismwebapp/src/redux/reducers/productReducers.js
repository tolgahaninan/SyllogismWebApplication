import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function productReducers(state = initialState.products, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return action.payload;
      break;
    case actionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return action.payload;
      break;
    case actionTypes.GET_PRODUCTS_BY_ID_SUCCESS:
      return action.payload;
      break;

    default:
      return state;
  }
}
