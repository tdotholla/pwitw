import React, { Component } from 'react';
import { connect } from "react-redux";


//ROUTER
import { ConnectedRouter } from "connected-react-router";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

import routes from "./routes";
import { history } from "./store";
import AppHeader from './components/Header/AppHeader.js';
import './App.scss';


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
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppHeader />
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
      </ThemeProvider>
    );
  }
}

//Connect
const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);