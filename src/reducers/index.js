import { combineReducers } from "redux";
import StationsReducer from "./stations";
import MapReducer from "./maps"

const rootReducer = combineReducers({
  stations: StationsReducer,
  map: MapReducer
});

export default rootReducer;
