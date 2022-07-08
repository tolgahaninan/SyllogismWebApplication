import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function likeReducers(state = initialState.likes, action) {
  switch (action.type) {
    case actionTypes.GET_LIKES_BY_PRODUCT_SUCCESS:
      return action.payload;
      break;
    case actionTypes.GET_LIKES_BY_USER_SUCCESS:
      return action.payload;
      break;
    default:
      return state;
  }
}
