import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import {formatDistance} from "date-fns"
import { Flipper, Flipped } from "react-flip-toolkit";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip';

import * as ACTIONS from "./../../client/actions/actionConstants";
import { isHome, getSorting, stableSort, panToMarker} from "../../functions";
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    display: 'flex'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  hide: {
    display: 'none',
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
    padding: 3,
  },
  warning: {
    color: '#ee3b0e',
    fontWeight: 'bold'
  },
  safe: {
    color: '#37bad6',
    fontWeight: 'bold'
  }
})

// const toolbarStyles = theme => ({
//   root: {
//     padding: 0,
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.55),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// });

const rows = [
  { id: '_changed', numeric: false, disablePadding: true, label: 'Last Logon (approx.)' },
  { id: 'hostname', numeric: false, disablePadding: true, label: 'Hostname' },
  { id: 'ip_local', numeric: false, disablePadding: true, label: 'Location (approx.)' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align="center"
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement="bottom"
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes } = props;

//   return (
//     <Toolbar
//       className={classNames(classes.root)}
//     >
//       <Typography variant="h6" id="tableTitle">
//         Asset Tracking
//       </Typography>
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class StatsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      order: 'desc',
      orderBy: '_changed',
      selected: [],
      page: 0,
      rowsPerPage: 10
	  };
	}

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  // handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     this.setState(state => ({ selected: state.data.map(n => n.id) }));
  //     return;
  //   }
  //   this.setState({ selected: [] });
  // };

  handleClick = (event, map, data) => {
    //when row of data is selected, pan to it's marker and show the infowindow
    let loc = data.location.split(',');
    let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
    this.setState(state => ({selected:data.hostname}))
    panToMarker(map, locObj)
    this.props.showInfoWindow(data)
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
    let { classes, data, map} = this.props;
    const {order, orderBy, selected} = this.state;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, Object.keys(data).length - page * rowsPerPage);
    // data = Object.values(data)
    // let sortable_by_logon = Object.values(data).map((ws) => [ws.hostname, new Date(ws._changed), ws.ip_local] ).sort((a,b) => b[1]- a[1])
   
    const sortableData = stableSort(Object.values(data), getSorting(order, orderBy))
    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    // const findByHost = (data, name) => {data.find(x=>(x.hostName == name)) }
    // const hosts = sortableData.map(x => x.hostname);
    //  console.log( sortableData.map(x => x.hostname).join(" "))
		return (
        <div id="StatsListWrapper" className={classes.tableWrapper}>
          <Flipper flipKey={this.state.orderBy}>
            <Table className={classes.table} aria-labelledby="tableTitle" padding="none"> 
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              
              <TableBody>
                {sortableData
                  .map(n => {
                    const isSelected = this.isSelected(n.hostname);
                    return (
                      <Flipped key={n._id} flipId={n._id} spring="stiff" >
                        <TableRow
                          className="rowItem"
                          hover
                          onClick={event => this.handleClick(null, map, n)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.hostname}
                          selected={isSelected}
                        >
                          <TableCell align="center" component="th" scope="row" padding="none">{formatDistance(new Date(n._changed), new Date())}</TableCell>
                          <TableCell align="center">{n.hostname}</TableCell>
                          <TableCell align="center">{isHome(n.ip_local) ? <span className={classes.safe}>LAN</span> : <span className={classes.warning}>{n.region ? n.region : "WAN"}</span>}</TableCell>
                        </TableRow>
                      </Flipped> 
                    );
                  })}
              </TableBody>
            </Table>
          </Flipper>
        </div>
    );
	}
}

//Redux
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showInfoWindow: (data) => dispatch({ type: ACTIONS.SHOW_INFOWINDOW, payload: data }),
    // hideInfoWindow: () => dispatch({type: ACTIONS.SHOW_INFOWINDOW, payload: false})
  };
}
export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true })
  )(StatsTable);