//Actions
import * as ACTIONS from "../actions/actionConstants";

const INITIAL_STATE = {
  byId: {},
  status: null
};

function StationsReducer(state = INITIAL_STATE, action) {
  const { payload, type, error } = action;
  switch (type) {
    case ACTIONS.STATIONS_API_REQUEST: {
      return { ...state, status: "FETCHING"};
    }
    case ACTIONS.STATIONS_API_START: {
      // console.log(payload)
      return { ...state, status: null, venue: payload };
    }
    case ACTIONS.STATIONS_API_RESULT: {
      // console.log(error)
      return { ...state, status: error || "SUCCESS", byId: payload };
    }
    default:
      return state;
  }
}

export default StationsReducer;

export function getAllStations(state) {
  return (state.stations.status === "SUCCESS") && state.stations.byId;
}

function getVenuesAPIstatus(state) {
  return state.venues.status;
}