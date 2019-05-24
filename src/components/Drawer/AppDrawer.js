import React, { Component } from 'react'
import { connect } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import PiGraph from './../Graph/PiGraph';
import StatsList from '../Map/StatsList';
import AssetSearch from '../Assets/AssetSearch';

class AppDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
	}

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, data, GMap} = this.props;
        return (
            <Drawer 
                variant="permanent"
            ><div className="App-drawer">
                <PiGraph data={data}/>
                <Divider />
                <AssetSearch data={data}/>
                <StatsList data={data} map={GMap}/>
            </div>
            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
      state,
      GMap: state.map.GMap
    };
  }

export default connect(
  mapStateToProps,
  null,
)(AppDrawer);