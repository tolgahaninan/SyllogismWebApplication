import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function featuredProductReducers(state = initialState.featuredProducts, action) {
  switch (action.type) {
    case actionTypes.GET_FEATURED_PRODUCTS_SUCCESS:
      return action.payload;
      break;

    default:
      return state;
  }
}
