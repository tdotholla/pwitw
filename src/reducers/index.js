import { combineReducers } from "redux";
import stationsReducer from "./stations";

const rootReducer = combineReducers({
  stations: stationsReducer
});

export default rootReducer;
