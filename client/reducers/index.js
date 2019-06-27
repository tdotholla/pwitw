import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import StationsReducer from "./stations";
import MapReducer from "./maps"


export default (history) => combineReducers({
  router: connectRouter(history),
  map: MapReducer,
  stations: StationsReducer
});