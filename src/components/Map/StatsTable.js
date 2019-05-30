import React, { Component } from "react";
import {distanceInWords} from "date-fns"
import MaterialTable from "material-table";

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

import { isHome, panToMarker} from "../../functions";
const styles = {
  warning: {
    color: '#ee3b0e',
    fontWeight: 'bold'
  },
  safe: {
    color: '#37bad6',
    fontWeight: 'bold'
  }
}


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

class StatsTable extends Component {

  render() {
    const columns = [
        { field: '_changed', title: 'Last Logon (approx.)', render: r => <span>{ distanceInWords(new Date(r._changed), new Date()) }</span> },
        { field: 'hostname', title: 'Hostname'},
        { field: 'ip_local', title: 'Location (approx.)', render: r => isHome(r.ip_local) ? <span style={styles.safe}>LAN</span> : <span style={styles.warning}>{r.region ? r.region : "WAN"}</span> } 
      ];
      
    let { data } = this.props;
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={columns}
          icons={tableIcons}
          data={Object.values(data)}
          title="Asset Tracking"
        />
      </div>
    );
  }
}

export default StatsTable;