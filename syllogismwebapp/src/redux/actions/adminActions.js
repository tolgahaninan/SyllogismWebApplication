import * as actionTypes from "./actionTypes";
import axios from "axios";

export function getSiteInfoSuccess(jsonResponse) {
  return { type: actionTypes.GET_SITE_INFO_SUCCESS, payload: jsonResponse };
}

export const getSiteInfo = () => async dispatch => {
  try{
      const res = await axios.get(`http://localhost:8000/api/siteinfo/read`)
      dispatch( {
          type: actionTypes.GET_SITE_INFO_SUCCESS,
          payload: res.data
      })
  }
  catch(e){
      dispatch( {
          type: actionTypes.SITE_INFO_ERROR,
          payload: console.log(e),
      })
  }

}