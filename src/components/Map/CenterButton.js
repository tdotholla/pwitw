import React, { Component } from 'react';
// import * as ACTIONS from "./../../actions/actionConstants";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import MyLocationIcon from '@material-ui/icons/MyLocation';

const targetClient = function(map,pos) {
  // SET CENTER, 
  // ZOOM TO CERTAIN LEVEL
    map.panTo(pos);
    map.setZoom(11);
};

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
				onClick={() => targetClient(GMap, browserLoc)}>
					<MyLocationIcon />
				</Fab>
		  </Tooltip>
		);
	}
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(CenterButton));
