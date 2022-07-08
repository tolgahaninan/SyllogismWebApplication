import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function commentReducer(state=initialState.comments,action){

    switch (action.type) {
        case actionTypes.GET_COMMENTS_SUCCESS:
            return  action.payload
            break;
  
        default:
            return state;
    }


}