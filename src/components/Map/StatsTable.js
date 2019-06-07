import React from "react";
import {distanceInWords} from "date-fns"
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

import * as ACTIONS from "./../../actions/actionConstants";
import { isHome, panToMarker} from "../../functions";
const styles = {
  warning: {
    color: '#ee3b0e',
    fontWeight: 'bold'
  },
  safe: {
    color: '#37bad6',
    fontWeight: 'bold'
  },
  cell: {
    padding: "3px 3px"
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
  // paginationType: "stepped",
  pageSize: 10,
  pageSizeOptions: [10,50,100],
  grouping: false,
  headerStyle: {padding:"3px 3px"},
  columnsButton: true,
  exportButton: true,
};
const StatsTable = ({data, map}) => {
  
  const dispatch = useDispatch();
  const columns = [
      { field: 'hostname', cellStyle: styles.cell, title: 'Name'},
      { field: '_changed', cellStyle: styles.cell ,title: 'Last Logon', render: r => <span >{ distanceInWords(new Date(r._changed), new Date()) }</span> },
      { field: 'uptime', cellStyle: styles.cell ,title: 'UpTime', render: r => <span >{ r.uptime && distanceInWords(new Date(r.uptime), new Date()) }</span> },
      { field: 'os_build', cellStyle: styles.cell ,title: 'Build'},
      { field: 'top_process', cellStyle: styles.cell , title: 'Top Process'},
      { field: 'ip_local', cellStyle: styles.cell , title: 'Location (approx.)', render: r => r.ip_local && (isHome(r.ip_local) ? <span style={styles.safe}>LAN</span> : <span style={styles.warning}> <img height="11px" src={r.flag} alt={` ${r.region} Flag`} /> {r.region ? r.region : "WAN"} </span>) } 
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