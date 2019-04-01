import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";

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

const request = require("request");
// const fetch = require("fetch");
const dbOptions = { 
  method: 'GET',
  url: 'https://pdubdb-705a.restdb.io/rest/workstations',
  headers: 
   { 
    'cache-control': 'no-cache',
    'x-apikey': '5c9a8400df5d634f46ecaf52',
   } 
 };

request(dbOptions, function (error, response, body) {
  if (error) throw new Error(error);
  Workstations = body;
});

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
    this.state={workstations: Workstations}
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="App-map" >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCa7QqTqLMM66gRtaW9KPFPdfkXgFAG8pA",          
            language: "en",
            region: "us"
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={MapOptions}
        >
        {console.log(this.state)}
        {Workstations && Workstations.map(ws => {
          console.log(ws)
        })}
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

export default FullMap;