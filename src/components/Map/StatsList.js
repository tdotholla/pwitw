import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classNames from 'classnames';
import {distanceInWords} from "date-fns"

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as ACTIONS from "./../../actions/actionConstants";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    // width: theme.spacing.unit * 7 + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing.unit * 9 + 1,
    // },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: 0,
  },
});

class StatsList extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
	    open: false,
	  };
	}

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

	render() {
    const { classes, theme, data } = this.props;
    let sortable_by_logon = []
    data.map((ws) => {
      sortable_by_logon.push([ws.hostname, new Date(ws._changed)])
    })
    sortable_by_logon = sortable_by_logon.sort((a,b) => b[1]- a[1])
    const not_in_office = Object.values(data).filter(val => val['ip_local'].split('.')[1] !== '117' )

		return (
			<div>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
          </div>
          <Divider />
          <List>
              <ListItem disableGutters>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}><ScheduleIcon fontSize="small"/> STATS </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <table>
                      <tbody>
                        <tr><th>Last Logon</th><th>Hostname</th></tr>
                        {sortable_by_logon.map((ws) => (
                          <tr key={ws[0]}><td>{distanceInWords(new Date(ws[1]), new Date())}</td><td>{ws[0]}</td></tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </ListItem>
              <ListItem disableGutters>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}><ScheduleIcon fontSize="small"/> STATS </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <table>
                    <tbody>
                      <tr><th>Hostname</th><th>Public IP</th></tr>
                      {not_in_office.map((ws) => (
                        <tr key={ws.hostname}><td>{ws.hostname}</td><td>{ws.ip_public}</td></tr>
                        )
                      )}
                    </tbody>
                  </table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </ListItem>
          </List>
          <Divider />
        </Drawer>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(StatsList);
