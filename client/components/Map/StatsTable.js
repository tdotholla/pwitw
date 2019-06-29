import React from "react";
import {format, formatDistance} from "date-fns"
import MaterialTable from "material-table";
import { useDispatch } from 'react-redux'

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Tooltip from '@material-ui/core/Tooltip';

import * as ACTIONS from "../../../client/actions/actionConstants";
import { isHome, panToMarker} from "../../../client/functions";
import { Typography } from "@material-ui/core";
const styles = {
  warning: {
    color: '#dd6666',
    fontSize: 8,
    fontWeight: 'bold',
    verticalAlign: "middle",
    textAlign: "center",
    margin:"0 auto"
  },
  safe: {
    color: '#37bad6',
    fontWeight: 'bold'
  },
  cell: {
    padding: "3px 3px",
  }
};

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

const tableOptions = {
  paginationType: "stepped",
  pageSize: 20,
  pageSizeOptions: [20,50,100],
  grouping: true,
  headerStyle: {padding:"3px 3px"},
  columnsButton: true,
  exportButton: true,
};
const StatsTable = ({data, map}) => {
  
  const dispatch = useDispatch();
  const columns = [
    { field: 'date_created', cellStyle: styles.cell, title: 'Date', 
    render: r => ( 
      <span >{ format(new Date(new Date(r.date_created)), "M.d.yy-hh:mm a") }</span> 
    )},
    { field: 'site', cellStyle: styles.cell ,title: 'Site'},
    { field: 'serial', cellStyle: styles.cell , title: 'Serial'},
    { field: 'computer_name', cellStyle: styles.cell , title: 'Name'},
    { field: 'console_user', cellStyle: styles.cell , title: 'User'},
    { field: 'UPN', cellStyle: styles.cell , title: 'UPN'},
    { field: 'logon_time_UTC', cellStyle: styles.cell , title: 'Logon', 
    render: r => ( 
      <span >{ format(new Date(new Date(r.logon_time_UTC)), "M.d.yy-hh:mm a") }</span> 
    )},
    { field: 'model_number', cellStyle: styles.cell , title: 'Model'},
    { field: 'ipv4_address', cellStyle: styles.cell , title: 'IP'},
    { field: 'manufacturer', cellStyle: styles.cell , title: 'Make'},
    { field: 'model_name', cellStyle: styles.cell , title: 'Model'},
    { field: 'current_os_install_date', cellStyle: styles.cell , title: 'Current OS Date', 
    render: r => ( 
      <span >{ format(new Date(new Date(r.current_os_install_date)), "M.d.yy-hh:mm a") }</span> 
    )},
    { field: 'original_os_install_date', cellStyle: styles.cell , title: 'OG OS Date', 
    render: r => ( 
      <span >{ format(new Date(new Date(r.original_os_install_date)), "M.d.yy-hh:mm a") }</span> 
    )},
    { field: 'os_build_number', cellStyle: styles.cell , title: 'Current Build'},
    { field: 'original_os_build_number', cellStyle: styles.cell , title: 'Orig Build'},
  ];
  
  const rowClickHandler = (data) => {
    let loc = data.location.split(',');
    let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
    // this.setState(state => ({selected:data.hostname}))
    panToMarker(map, locObj)
    dispatch({ type: ACTIONS.SHOW_INFOWINDOW, payload: data })
  }

  return (
    <MaterialTable
      style={{"width":'100%', "padding": "0 3px", "bottom": 0}}
      columns={columns}
      icons={tableIcons}
      data={Object.values(data)}
      title="Asset Tracking"
      options={tableOptions}
      // detailPanel={(d) => d.ip_public}
      onRowClick={(e, data) => rowClickHandler(data) }
    />
  );
  
}

export default StatsTable;