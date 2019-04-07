import { combineReducers } from "redux";
import StationsReducer from "./stations";
import MapReducer from "./map"

const rootReducer = combineReducers({
  stations: StationsReducer,
  map: MapReducer
});

export default rootReducer;
