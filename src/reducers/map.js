//Actions
import * as ACTIONS from "../actions/actionConstants";

const INITIAL_STATE = {
  'GMap': null
};

function MapReducer(state = INITIAL_STATE, action) {
  const { payload, type, error } = action;
  switch (type) {
    case ACTIONS.SHOW_INFOWINDOW: {
      return { ...state, 'status': "FETCHING"};
    }
    case ACTIONS.HIDE_INFOWINDOW: {
      // console.log(payload)
      return { ...state, 'status': null };
    }
    case ACTIONS.MAP_LOADED: {
      // console.log(error)
      return { ...state, 
        'GMap': payload 
      };
    }
    default:
      return state;
  }
}

export default MapReducer;