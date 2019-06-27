import React, { Component } from 'react';
import { connect } from "react-redux";
import Loader from 'react-loader-spinner';

import AppDrawer from './../../components/Drawer/AppDrawer.js';
import AppMap from './../../components/Map/AppMap.js';

import * as ACTIONS from "./../../client/actions/actionConstants";


class LandingPage extends Component {
    componentDidMount() {
      window.setInterval(this.props.getAllWorkstations, 60000); //gets stations every 60 seconds (API limit is 50k requests/month = 1.2/hour for 31 days)
      this.props.getAllWorkstations();     //calls from db and stores in state.stations
    }
    render() {
      const { stations } = this.props;
      return (
        <div className="App">
            { !stations && <Loader 
                type="Plane"
                color="#00BFFF"
                height="50%"	
                width="50%"
            /> }
            {stations && <AppDrawer data={stations} /> }
            {stations && <AppMap data={stations} /> }
        </div>
      )
    }
}

//Connect
const mapStateToProps = state => ({
    state,
    stations: state.stations.byId
});
  
const mapDispatchToProps = dispatch => ({
    dispatch,
    getAllWorkstations: () => dispatch({ type: ACTIONS.STATIONS_API_REQUEST })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage);