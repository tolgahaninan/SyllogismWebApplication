import { combineReducers } from "redux";
import changeCategoryReducer from "./changeCategoryReducer";
import userReducers from "./userReducers"
import categoryReducers from "./categoryReducers";
import productReducers from "./productReducers"
import siteInfoReducer from "./siteInfoReducer";
import commentReducer from "./commentReducer";
import likeReducers from "./likeReducers";
import rateReducers from "./rateReducers";
import featuredProductReducers from "./featuredProductReducers"
import featuredCategoryReducers from "./featuredCategoryReducers";


const reducers = combineReducers ({
 changeCategoryReducer,
 userReducers,
 categoryReducers,
 productReducers,
 siteInfoReducer,
 commentReducer,
 likeReducers,
 rateReducers,
 featuredProductReducers,
 featuredCategoryReducers
});

export default reducers;