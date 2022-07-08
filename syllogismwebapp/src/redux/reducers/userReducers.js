import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducers(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS:
      return action.payload;
      break;

    case actionTypes.GET_USER_SUCCESS:
      return action.payload;
      break;

    default:
      return state;
  }
}
