import { all } from "redux-saga/effects";

//Watchers
// import authSaga from "./auth";
// import init from "./init";
import stationsWatcherSaga from "./stations";

export default function* rootSaga() {
  yield all([stationsWatcherSaga()]);
}