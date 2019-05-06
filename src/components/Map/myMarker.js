import React from 'react';
import PropTypes from 'prop-types';
import { Marker} from '@react-google-maps/api'
import { connect } from "react-redux";
import * as ACTIONS from "./../../actions/actionConstants";

class MyMarker extends React.Component {
  static propTypes = {
    position: PropTypes.string,
  };

  handleMouseOverMarker = (e, data) => {
    this.props.getInfoWindow(data)
  }

  handleMouseExitMarker = () => {
    this.props.hideInfoWindow();
  }
  
  render() {
    const { handleMouseExitMarker, handleMouseOverMarker } = this;
    let { data, clusterer } = this.props;
    let loc = data.location.split(',');
    let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
    let image ={
      url: "https://cdn0.iconfinder.com/data/icons/gloss-basic-icons-by-momentum/32/pin-red.png",
    }

    return (
      <div>
      <Marker 
        className="App-marker"
        key={data._id}
        position={locObj}
        clusterer={clusterer}
        icon={image}
        title={`${data.hostname}-${data.username}`}
        onMouseOver={(m) => handleMouseOverMarker(m,data)}
        onMouseOut={() => handleMouseExitMarker()}
      />
      </div>
    )
  }
}

//Redux
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllWorkstations: () => dispatch({ type: ACTIONS.STATIONS_API_REQUEST }),
    getInfoWindow: (data) => dispatch({ type: ACTIONS.SHOW_INFOWINDOW, payload: data }),
    hideInfoWindow: () => dispatch({type: ACTIONS.SHOW_INFOWINDOW, payload: false})
  };
}

export default connect(
  null,
  mapDispatchToProps
)(MyMarker)