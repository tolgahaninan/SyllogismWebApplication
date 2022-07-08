import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function rateReducers(state = initialState.rates, action) {
  switch (action.type) {
    case actionTypes.GET_RATES_BY_PRODUCT_SUCCESS:
      return action.payload;
      break;

    default:
      return state;
  }
}
