import { combineReducers } from "redux";
import baseReducer from "./base";
import collectionReducer from './collection';

const reducer = combineReducers({
  base: baseReducer,
  collections: collectionReducer
});

export  default reducer;