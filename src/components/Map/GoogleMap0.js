import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api'
import { connect } from "react-redux";
// import m1 from "./images/m1.png";
// import m2 from "./images/m2.png";
// import m3 from "./images/m3.png";
// import m4 from "./images/m4.png";
// import m5 from "./images/m5.png";
// import markerPin from "./images/pin-red.png";
import * as ACTIONS from "./../../actions/actionConstants";
import MyMarker from './myMarker'
// import { getAllWorkstations } from "./../../actions/actionConstants"
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class FullMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfoWindow: null,
      browserLocation: false,
      map: null,
      markerData: {},
    };
  }

  static defaultProps = {
    center: {
      "lat": 38.9065495,
      "lng": -77.0518192
    },
    zoom: 5,
    options: {
      clickableIcons: false,
      disableDefaultUI: true,
      fullscreenControl: false,  
      mapTypeControl: false,
      scaleControl: false,
      rotateControl: true,
      streetViewControl: false,
      gestureHandling: "cooperative",
      scrollwheel: true,
      // Map styles; snippets from 'Snazzy Maps'.
      styles: [
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 30
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000"
                  },
                  {
                      "lightness": 10
                  }
              ]
          },{
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 29
                  },
                  {
                      "weight": 0.2
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 18
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#fff"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 25
                  }
              ]
          },
          {
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": 36
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 50
                  }
              ]
          },
          {
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 19
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  },
                  {
                      "weight": 1.2
                  }
              ]
          }]
    }
  };

  componentDidMount() {
    //calls from db and stores in state.stations
    this.props.getAllWorkstations();
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          browserLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
      })
    }
  }
  
  handleMouseOverCluster = (cluster) => {
    this.setState({
      showInfoWindows: true
    })
  }


  render() {
    const {center, zoom, options, state, getInfoWindow, mapLoaded, GMap} = this.props;
    const {showInfoWindow, marker, markerData, browserLocation} = this.state;
    const {handleMouseOverCluster} = this;
    return (
      // Important! Always set the container height explicitly
      //set via app-map classname
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCa7QqTqLMM66gRtaW9KPFPdfkXgFAG8pA"
        language="en"
        region="us" >
        <GoogleMap
          onLoad={map => {
            const bounds = new window.google.maps.LatLngBounds();
            // map.fitBounds(bounds);
            this.setState({map: map})
            mapLoaded(map)
          }}
          mapContainerClassName="App-map"
          center={browserLocation || center}
          zoom={zoom}
          options={options}
        >
          <div>{
            GMap && state.stations.all &&  state.stations.all.map((ws) => {
              let loc = ws.location.split(',');
              let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
              return ws.location && <MyMarker data={ws}/>
            })
          }</div> 
        </GoogleMap>
      </LoadScript>
    );
  }
}

FullMap.propTypes = {
  // hoverKey: PropTypes.string
}
//Redux
function mapStateToProps(state) {
  return {
    state,
    GMap: state.map.GMap
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllWorkstations: () => dispatch({ type: ACTIONS.STATIONS_API_REQUEST }),
    mapLoaded: (map) => dispatch({ type: ACTIONS.MAP_LOADED, payload: map }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMap);
