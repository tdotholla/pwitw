import React, { useState } from 'react';
import { connect } from "react-redux";
import { 
  ResponsiveContainer, Cell, Legend, Tooltip, 
  BarChart, Bar, XAxis, YAxis, 
  PieChart, Pie, LabelList
} from 'recharts';
import Loader from 'react-loader-spinner';
import chroma from 'chroma-js';
// import { Flipper, Flipped } from "react-flip-toolkit";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from'@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import * as ACTIONS from "../../../client/actions/actionConstants";
import { getUnique } from "../../../client/functions";

  // let dayArray = []
//want amount of ppl out vs ppl in (inside chart)
//want groups of logins (<8 hrs, <24, <1wk 1wk>)
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{fontSize:"12px"}}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


// const colors = ['rgba(255, 27, 27, 0.8)','rgba(179, 27, 27, 0.8)','rgba(193, 131, 54, 0.8)','rgba(81, 129, 115, 0.8)','rgba(52, 153, 81, 0.8)','rgba(35, 165, 121, .8)','rgba(55, 186, 214, 0.8)','rgba(155, 146, 234, 0.8)'];

const BuildGraph = props => {
  let { data } = props;
  const [mapType, setMapType] = useState("Bar");

  data = Object.values(data);
  let uptimeData = getUnique(data,"os_build_number");
  let colors = chroma.scale(['#ff8675','#f7cd00','#639b76']).mode('lch').colors(uptimeData.length)
  return (
  uptimeData ? (
   <div style={{ backgroundColor: "#eee"}}>
      <FormControl>
        <Select onChange={(e) => setMapType(e.target.value)} input={<Input name="map-type" id="map-type-helper" value={mapType}/>} >
          <MenuItem value="Bar">Bar</MenuItem>
          <MenuItem value="Pie">Pie</MenuItem>
        </Select>
        <FormHelperText>Select Chart Type </FormHelperText>
      </FormControl>
      
      <ResponsiveContainer height={250} width="100%">
      { ( 
        mapType === "Bar" ) ? (
        <BarChart style={{fontSize:"12px"}} data={uptimeData} startAngle={180} endAngle={0}>
          <XAxis dataKey="name" />
          <YAxis scale="sqrt"/>
          <Tooltip />
          <Bar dataKey="value" isAnimationActive={false}>
          { 
            uptimeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]}/>
            ))
          }
          </Bar>
        </BarChart>
        ) : ( mapType === "Pie" ) ? (
        <PieChart style={{fontSize:"12px"}}>
          <Legend layout="vertical" align="left" verticalAlign="middle" iconSize={10} iconType="diamond"/>
          <Tooltip />

          <Pie 
          data={uptimeData} 
          cx="50%" 
          cy="50%" 
          dataKey="value" 
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={false} //should be able to remove this prop, I think there is a bug in Pie stopping labels from rendering. This is a temp fix.  
          >
          {
            uptimeData.map( (entry,index) => (
              <Cell key={`wedge-${index}`} fill={colors[index]} className="pieWedge"/> 
            ))
          }
          </Pie>
          <LabelList dataKey="value" position="top" />
        </PieChart>
      ) : (<div />)
      }
      </ResponsiveContainer>
      <Typography variant="subtitle2"> Build Version </Typography>
    </div>
  ) : (<Loader type="Audio" />)
  )
}

//Connect
const mapStateToProps = state => ({
  state,
  stations: state.stations.byId
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  updateList: (data) => dispatch({ type: ACTIONS.UPDATE_LIST, payload: data })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BuildGraph);