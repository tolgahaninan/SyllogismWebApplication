import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function featuredCategoryReducers(state = initialState.featuredCategories, action) {
  switch (action.type) {
    case actionTypes.GET_FEATURED_CATEGORIES_SUCCESS:
      return action.payload;
      break;

    default:
      return state;
  }
}
