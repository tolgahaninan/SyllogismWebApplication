import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function siteInfoReducer(state=initialState.siteInfo,action){

    switch (action.type) {
        case actionTypes.GET_SITE_INFO_SUCCESS:
            return  action.payload
            break;
  
        default:
            return state;
    }
}