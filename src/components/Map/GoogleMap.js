import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, MarkerClusterer, Marker  } from '@react-google-maps/api'
import { connect } from "react-redux";

import * as ACTIONS from "./../../actions/actionConstants";
// import { getAllWorkstations } from "./../../actions/actionConstants"
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapOptions = {
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

class FullMap extends Component {

  static defaultProps = {
    center: {
      "lat": 38.9065495,
      "lng": -77.0518192
    },
    zoom: 5
  };

  componentDidMount() {
    this.props.getAllWorkstations();
  }
  render() {
    const {props} = this;
    return (
      // Important! Always set the container height explicitly
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCa7QqTqLMM66gRtaW9KPFPdfkXgFAG8pA"
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={props.center}
          zoom={props.zoom}
          options={MapOptions}
        >
        
          {
// <MarkerClusterer imagePath="https://www.respectfulrevolution.org/sites/all/themes/curiouser_respect/graphics/key4.png">
            // (clusterer) => 
            ( props.state.stations.all ) && props.state.stations.all.map(function(ws) {
              let loc = ws.location.split(',');
              let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
              let image ={
                url: "https://cdn0.iconfinder.com/data/icons/gloss-basic-icons-by-momentum/32/pin-red.png",
                
              }
              return (
                (ws.location) && (
                  <Marker
                    className="App-marker"
                    key={ws._id}
                    position={locObj}
                    // clusterer={clusterer}
                    icon={image}
                    title={`${ws.hostname}-${ws.username}`}
                  />
                )
              )
            })
        // </MarkerClusterer>
        }
        
        </GoogleMap>
      </LoadScript>
    );
  }
}

FullMap.propTypes = {
  hoverKey: PropTypes.string
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
