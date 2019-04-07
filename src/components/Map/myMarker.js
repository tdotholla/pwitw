import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow, Marker} from '@react-google-maps/api'
import { connect } from "react-redux";
import * as ACTIONS from "./../../actions/actionConstants";

const StationWindow = ({...props}) => {
  let {data, position, marker} = props;
  return <InfoWindow
        position={position}
        options={{
          pixelOffset: {height:-30,width:0}
        }}
        style={{padding:0}}
        key={data._id}
        >
        <div className="App-infowindow">
          <h3>{data.hostname}</h3>
          <p>{data.ip_local}<br />
          {data.username}<br />
          {data._changed}</p>
        </div>
      </InfoWindow>
  }

class MyMarker extends React.Component {
  static propTypes = {
    position: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }
  handleMouseOverMarker = (e, data) => {
    this.props.getInfoWindow({showInfoWindow: true, markerData: data})
  }

  handleMouseExitMarker = () => {
    this.props.hideInfoWindow({
      showInfoWindow: false,
      markerData: null
    });
  }
  
  render() {
    const { handleMouseExitMarker, handleMouseOverMarker } = this;
    let {data, clusterer, setMarker } = this.props;
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
        onMouseOut={() => handleMouseExitMarker}
      />
      {true && (<StationWindow position={locObj} data={data}/>)}
      </div>
    )
  }
}

//Redux
function mapStateToProps(state) {
  return {
    state,
    marker: state.map.marker
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllWorkstations: () => dispatch({ type: ACTIONS.STATIONS_API_REQUEST }),
    getInfoWindow: (data) => dispatch({ type: ACTIONS.SHOW_INFOWINDOW, data }),
    hideInfoWindow: () => dispatch({type: ACTIONS.HIDE_INFOWINDOW})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMarker)