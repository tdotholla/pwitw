import React, { Component } from 'react'
import withRedux from "next-redux-wrapper"

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import makeStore from '../client/store/makeStore'
import NetworkGraph from './../client/components/Graph/NetworkGraph';
import BuildGraph from './../client/components/Graph/BuildGraph';
import StatsTable from '../client/components/Map/StatsTable';
import AssetSearch from '../client/components/Assets/AssetSearch';
import UptimeGraph from '../client/components/Graph/UptimeGraph';
import ProcessGraph from '../client/components/Graph/ProcessGraph';

import '../client/App.scss';
import '../client/index.css';

import AppDrawer from './../client/components/Drawer/AppDrawer.js'
// import * as serviceWorker from '../client/serviceWorker';
let Page = ({foo, custom}) => (
	<div className="test2"> 
	<h2>Hi There, Brayden Byrne </h2>
	<p>{foo}-{custom}</p>
	</div>
)

Page.getInitialProps = ({store, isserver, pathname, query}) => {
	store.dispatch({type: 'FOO', payload: 'foooobbaaar'});
	// console.log({ custom:'custom'})
	return {custom: 'custom'}
}

Page = withRedux(makeStore, (state) => ({foo: state.foo}))(Page);

export default Page;