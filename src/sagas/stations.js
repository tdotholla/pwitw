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
  yield takeLatest(ACTIONS.STATIONS_API_REQUEST, stationsFetchSaga);
}

function* stationsFetchSaga() {
  yield put({ type: ACTIONS.STATIONS_FETCH_START });
  // console.log('running venues saga...')
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
