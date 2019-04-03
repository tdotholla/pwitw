import {
  all,
  call,
  put,
  fork,
  takeLatest,
  takeEvery, 
  select
} from "redux-saga/effects";
//Actions
import * as ACTIONS from "../actions/actionConstants";

import { stationsFetchAll } from "../db/restdb";

function* stationsFetchWatcherSaga() {
  yield takeLatest(ACTIONS.GET_ALL_WORKSTATIONS, stationsFetchSaga);
}

function* stationsFetchSaga() {
  yield put({ type: ACTIONS.STATIONS_API_START });
  // console.log('running stations saga...')
  try {
    const stations = yield call(stationsFetchAll);
    yield put({ type: ACTIONS.STATIONS_API_RESULT, payload: stations });
  } catch (error) {
    console.warn("ERROR:", error);
    yield put({ type: ACTIONS.STATIONS_API_RESULT, error: error });
  }
}

export default function* stationsWatcherSaga() {
  yield all([fork(stationsFetchWatcherSaga)]);
}
