import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme, withTheme } from "@material-ui/core/styles";
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

import * as ACTIONS from "./actions/actionConstants";

import './App.css';
import AppDrawer from './components/Drawer/AppDrawer.js';
import AppHeader from './components/Header/AppHeader.js';
import AppMap from './components/Map/AppMap.js';


const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: blue,
  },
  status: {
    danger: 'orange',
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
  },
});

class App extends Component {
  componentDidMount() {

    window.setInterval(this.props.getAllWorkstations, 5000); //gets stations every 5 seconds
    this.props.getAllWorkstations();     //calls from db and stores in state.stations
  }
  render() {
    const { stations } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppHeader />
          {stations && <AppDrawer data={stations} /> }
          {stations && <AppMap data={stations} /> }
        </div>
      </MuiThemeProvider>
    );
  }
}

//Connect
const mapStateToProps = state => ({
  state,
  stations: state.stations.all
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getAllWorkstations: () => dispatch({ type: ACTIONS.STATIONS_API_REQUEST })
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTheme(),
  // withAuthentication()
)(App);