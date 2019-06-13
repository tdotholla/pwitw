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
import Tooltip from '@material-ui/core/Tooltip';

import * as ACTIONS from "./../../actions/actionConstants";
import { isHome, panToMarker} from "../../functions";
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
      { field: '_changed', cellStyle: styles.cell ,title: 'Logon', 
      render: r => ( 
        <span >{ distanceInWords(new Date(r._changed), new Date()) }</span> 
      )},
      { field: 'uptime', cellStyle: styles.cell ,title: 'UpTime', 
      render: r => ( 
        <span >{ r.uptime && distanceInWords(new Date(r.uptime), new Date()) }</span> 
      )},
      { field: 'os_build', cellStyle: styles.cell ,title: 'Build'},
      { field: 'top_process', cellStyle: styles.cell , title: 'Top Process',
      render: r=> (
        <span> {r.top_process && r.top_process.slice(0,-4)} </span>
      )},
      { field: 'ip_local', cellStyle: styles.cell , title: 'Region', 
      render: r => ( r.ip_local && (isHome(r.ip_local)) ? (
        <Tooltip className="tableRow_LAN" title={r.region ? r.region : "LAN"} aria-label={r.region ? r.region : "LAN"}>
          <Typography variant="button" className="tableRow_LAN"> LAN </Typography> 
        </Tooltip>
        ) : (
          r.flag !== "none" ? (
            <Tooltip className="tableRow_WAN" title={r.region ? r.region : "WAN"} aria-label={r.region ? r.region : "WAN"}>
              <img height="14px" src={r.flag} alt={`${r.region}`} />
            </Tooltip>
          ) : (
            <span className="tableRow_WAN">{r.region}</span>
          )
          
        )
      )} 
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