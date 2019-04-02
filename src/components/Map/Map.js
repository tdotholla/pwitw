import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux";

import * as ACTIONS from "./../../actions/actionConstants";
import Marker from "./Marker";
// import { getAllWorkstations } from "./../../actions/actionConstants"
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
let Workstations

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
    this.props.getAllWorkstations();
  }
  render() {
    const {props} = this;
    return (
      // Important! Always set the container height explicitly
      <div className="App-map" >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCa7QqTqLMM66gRtaW9KPFPdfkXgFAG8pA",          
            language: "en",
            region: "us"
          }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          options={MapOptions}
        >
        {
        //   props.state.stations && props.state.stations.map(function(ws) {
        //   console.log(ws)
        // })
        }
          <Marker
            lat={38.9065495}
            lng={-77.0518192}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
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
