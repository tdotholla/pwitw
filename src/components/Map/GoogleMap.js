import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, InfoWindow, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api'
import { connect } from "react-redux";
import m1 from "./images/m1.png";
import m2 from "./images/m2.png";
import m3 from "./images/m3.png";
import m4 from "./images/m4.png";
import m5 from "./images/m5.png";
import * as ACTIONS from "./../../actions/actionConstants";
// import { getAllWorkstations } from "./../../actions/actionConstants"
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const clusterStyles= [{
      url: m1,
      height: 53,
      width: 53,
      anchor: [26, 26],
      textColor: '#000',
      textSize: 11
  }, {
      url: m2,
      height: 56,
      width: 56,
      anchor: [28, 28],
      textColor: '#000',
      textSize: 11
  }, {
      url: m3,
      height: 66,
      width: 66,
      anchor: [33, 33],
      textColor: '#000',
      textSize: 11
  }, {
      url: m4,
      height: 78,
      width: 78,
      anchor: [39, 39],
      textColor: '#000',
      textSize: 11
  }, {
      url: m5,
      height: 90,
      width: 90,
      anchor: [45, 45],
      textColor: '#000',
      textSize: 11
}]

const StationWindow = ({...props}) => {
  let {stations, position} = props;
  let loc = position.split(',');
  let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
  return stations.map(station => (<InfoWindow
        position={locObj}
        options={{
          pixelOffset: {height:-30,width:0}
        }}
        style={{padding:0}}
        key={station._id}
        >
        <div className="App-infowindow">
          <h3>{station.hostname}</h3>
          <p>{station.ip_local}<br />
          {station.username}<br />
          {station._changed}</p>
        </div>
      </InfoWindow>
      ))
  }

class FullMap extends Component {
  state = {
    showInfoWindow: null,
    browserLocation: false,
    markerData: {}
  };

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

  handleMouseOverMarker = (e, data) => {
    this.setState({
      showInfoWindow: true,
      markerData: data
    })
  }
  handleMouseOverCluster = (cluster) => {
    this.setState({
      showInfoWindows: true
    })
  }
  handleMouseExitMarker = (e) => {
    this.setState({
      showInfoWindow: null
    })
  }

  render() {
    const {center, zoom, options, state} = this.props;
    const {showInfoWindow, markerData, browserLocation} = this.state;
    const {handleMouseExitMarker, handleMouseOverMarker, handleMouseOverCluster} = this;
    return (
      // Important! Always set the container height explicitly
      //set via app-map classname
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCa7QqTqLMM66gRtaW9KPFPdfkXgFAG8pA"
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={browserLocation || center}
          zoom={zoom}
          options={options}
        >{
          state.stations.all && (<div>
            {showInfoWindow && markerData && (<StationWindow position={markerData.location} stations={[markerData]}/>)}
            <MarkerClusterer 
            imagePath={`${process.env.PUBLIC_URL}/images/m`} 
            styles={clusterStyles}
            onMouseOver={handleMouseOverCluster} >{
              (clusterer) => { 
                return state.stations.all.map((ws) => {
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
                        clusterer={clusterer}
                        icon={image}
                        title={`${ws.hostname}-${ws.username}`}
                        onMouseOver={(e) => handleMouseOverMarker(e, ws)}
                        onMouseOut={handleMouseExitMarker}
                      >
                      </Marker>
                      )
                    )
                  })
              }
              }</MarkerClusterer>
              </div> )
            }</GoogleMap>
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
