import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { MuiThemeProvider, withTheme } from "@material-ui/core";

import logo from './logo.svg';
import './App.css';
import FullMap from './components/Map/GoogleMap0.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={null}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://www.perkinswill.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Perkins+Will
            </a>
          </header>
          <FullMap/>
        </div>
      </MuiThemeProvider>
    );
  }
}

//Connect
const mapStateToProps = state => ({
  // authUser: state.session.authUser,
  data: null,
});

const mapDispatchToProps = dispatch => ({
  // init: () => dispatch({ type: "INIT", filter: "generateData" })
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTheme(),
  // withAuthentication()
)(App);