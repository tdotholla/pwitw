import React, { useState } from 'react';
import { connect } from "react-redux";
import { 
  ResponsiveContainer, Cell, Tooltip, 
  BarChart, Bar, XAxis, YAxis, 

} from 'recharts';
import chroma from 'chroma-js';
import Loader from 'react-loader-spinner';
// import { Flipper, Flipped } from "react-flip-toolkit";
import Typography from '@material-ui/core/Typography';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from'@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as ACTIONS from "../../actions/actionConstants";
import { getUnique } from "../../functions";

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

const ProcessGraph = props => {
  let { data } = props;

  data = Object.values(data);
  let processData = getUnique(data,"top_process").sort((a,b) => b.value - a.value);

  let colors = chroma.scale(['maroon','teal']).mode('lch').colors(processData.length)
  return (
  processData ? (
   <div style={{ backgroundColor: "#eee"}}>
      
      <ResponsiveContainer height={200} width="100%">
        <BarChart style={{fontSize:"12px"}} data={processData} startAngle={180} endAngle={0}>
          <XAxis dataKey="name" />
          <YAxis scale="sqrt"/>
          <Tooltip />
          <Bar dataKey="value" isAnimationActive={false}>
          { 
            processData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]}/>
            ))
          }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="subtitle2"> Top Process (by Virtual Memory)</Typography>

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
  )(ProcessGraph);