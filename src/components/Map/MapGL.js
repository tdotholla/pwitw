import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ReactMapGL, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import * as ACTIONS from "./../../actions/actionConstants";

class FullMap extends Component {
 static defaultProps = {
    viewport: {
      width: '100vw',
      height: '100vh',
      center: {
        "lat": 38.9065495,
        "lng": -77.0518192
      },
      zoom: 5
    }
  };

  componentDidMount() {
    this.props.getAllWorkstations();
  }

  render() {
    const {props} = this;

    return (
      <ReactMapGL
        {...props.viewport}
        className="App-map"
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} >
        {
          props.state.stations.all && props.state.stations.all.map(function(ws) {
              let loc = ws.location.split(',');
              console.log(ws)
              return (
                (ws.hostname && ws.ip.length > 0) && (
                <Marker >{`${ws.hostname}-${ws.email}`}</Marker>
                )
              )
          })
        }

        </ReactMapGL>
    );
  }
}

//Redux
function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllWorkstations: () => dispatch({ type: ACTIONS.GET_ALL_WORKSTATIONS }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMap);