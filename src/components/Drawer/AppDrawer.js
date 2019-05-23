import React, { Component } from 'react'
import classNames from 'classnames';
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import PiGraph from './../Graph/PiGraph';
import StatsList from '../Map/StatsList';
import AssetSearch from '../Assets/AssetSearch';

const drawerWidth = 440;

const styles = theme => ({
    drawer: {
      padding: "0px 7px",
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    }
  });

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
                className={classes.drawer}
                classes={ {paper: classes.drawer} }
            >
                <PiGraph data={data} drawerWidth={drawerWidth}/>
                <Divider />
                <AssetSearch data={data}/>
                <StatsList data={data} drawerWidth={drawerWidth} map={GMap}/>
                
                
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

export default compose(
    connect(
      mapStateToProps,
      null,
    ),
    withStyles(styles, { withTheme: true })
  )(AppDrawer);