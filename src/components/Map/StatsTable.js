import React, { Component } from "react";
import {distanceInWords} from "date-fns"
import MaterialTable from "material-table";

import { isHome, panToMarker} from "../../functions";

class StatsTable extends Component {
  render() {
    const columns = [
        { field: '_changed', title: 'Last Logon (approx.)' },
        { field: 'hostname', title: 'Hostname' },
        { field: 'ip_local', title: 'Location (approx.)' }
      ];
      
    let { data } = this.props;
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={columns}
          data={Object.values(data)}
          title="Asset Tracking"
        />
      </div>
    );
  }
}

export default StatsTable;