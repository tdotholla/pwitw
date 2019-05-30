import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner'

import { ThemeProvider, withTheme } from "@material-ui/styles";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

import * as ACTIONS from "./actions/actionConstants";

import './App.scss';
import AppDrawer from './components/Drawer/AppDrawer.js';
import AppHeader from './components/Header/AppHeader.js';
import AppMap from './components/Map/AppMap.js';


let theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: blue,
  },
  status: {
    danger: 'orange',
  }
});
theme = responsiveFontSizes(theme);

class App extends Component {
  componentDidMount() {

    window.setInterval(this.props.getAllWorkstations, 60000); //gets stations every 60 seconds (API limit is 50k requests/month = 1.2/hour for 31 days)
    this.props.getAllWorkstations();     //calls from db and stores in state.stations
  }
  render() {
    const { stations } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppHeader />
          { !stations && <Loader 
              type="Plane"
              color="#00BFFF"
              height="50%"	
              width="50%"
            /> }
          {stations && <AppDrawer data={stations} /> }
          {stations && <AppMap data={stations} /> }
        </div>
      </ThemeProvider>
    );
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);