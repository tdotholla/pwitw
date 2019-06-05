import React, { Component } from 'react'
// import { compose } from 'redux';
import { connect } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import NetworkGraph from './../Graph/NetworkGraph';
import BuildGraph from './../Graph/BuildGraph';
import StatsTable from '../Map/StatsTable';
import AssetSearch from '../Assets/AssetSearch';

const styles = {
    root: {
        backgroundColor: 'transparent'
    },
    docked: {},
    paper: {},
};

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
        const { data, GMap} = this.props;
        return (
            <Drawer 
                variant="permanent"
            ><div className="App-drawer">
                <NetworkGraph data={data}/>
                <BuildGraph data={data}/>
                <Typography variant="h5" align="center" className="App-fancytext">Total: {Object.values(data).length} </Typography>
                <Divider />
                <AssetSearch data={data}/>
                <StatsTable data={data} map={GMap}/>
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