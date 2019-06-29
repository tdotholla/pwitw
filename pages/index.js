import React, { Component } from 'react'
import { connect } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import NetworkGraph from './../client/components/Graph/NetworkGraph';
import BuildGraph from './../client/components/Graph/BuildGraph';
import StatsTable from '../client/components/Map/StatsTable';
import AssetSearch from '../client/components/Assets/AssetSearch';
import UptimeGraph from '../client/components/Graph/UptimeGraph';
import ProcessGraph from '../client/components/Graph/ProcessGraph';

import '../client/App.scss';
import '../client/index.css';

import AppDrawer from './../client/components/Drawer/AppDrawer.js'
import Link from 'next/link';
// import * as serviceWorker from '../client/serviceWorker';

class Index extends React.Component {
    static getInitialProps ({ reduxStore, req }) {
      const isServer = !!req
      // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
      //reduxStore.dispatch(serverRenderClock(isServer))
  
      return {}
    }
  
    componentDidMount () {
      // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
      // TO TICK THE CLOCK
     // this.timer = setInterval(() => this.props.startClock(), 1000)
    }
  
    componentWillUnmount () {
      //
    }
  
    render () {
      return <div>Welcome to the page
        <Link href="/pwit">PWIT</Link> 
      </div>

    }
  }
  const mapDispatchToProps = null
  export default connect(
    null,
    mapDispatchToProps
  )(Index)