import React, { Component } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import * as ACTIONS from "../../actions/actionConstants";
import {panToMarker} from "../../functions";

const styles = theme => ({
  root: {
    display: 'flex',
  }
});

class CenterButton extends Component {
	render() {
		const { GMap, browserLoc } = this.props.state.map;
		return (
			<Tooltip title="Use Your Location!" aria-label="Center">
				<Fab 
				tabIndex="2" 
				aria-label="Locate"
				onClick={() => {
					panToMarker(GMap, browserLoc);
					if (navigator && navigator.geolocation) {
						navigator.geolocation.getCurrentPosition((pos) => {
							const coords = pos.coords;
							this.props.setBrowserLocation({
								lat: coords.latitude,
								lng: coords.longitude
							})
						})
					}}}>
					<MyLocationIcon />
				</Fab>
		  </Tooltip>
		);
	}
}

const mapStateToProps = state => ({
	state,
	browserLoc: state.map.browserLoc
});

const mapDispatchToProps = dispatch => ({
	dispatch,
	setBrowserLocation: (loc) => dispatch({type:ACTIONS.SET_BROWSER_LOCATION, payload: loc}) 
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(CenterButton));
