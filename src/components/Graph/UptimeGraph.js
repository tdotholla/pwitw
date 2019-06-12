import React, { useState } from 'react';
import { connect } from "react-redux";
import { 
  ResponsiveContainer, Legend, Tooltip, 
  PieChart, Pie, Cell, LabelList,
  BarChart, Bar, XAxis, YAxis
} from 'recharts';
import { differenceInMinutes, differenceInHours, differenceInDays} from "date-fns";
import chroma from 'chroma-js';

// import { Flipper, Flipped } from "react-flip-toolkit";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from'@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';


import * as ACTIONS from "../../actions/actionConstants";

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

//want number of machines over time. array of objects, each object is a dot, each object has time (x) 

const UptimeGraph = props => {
    let {data} = props;
    data = Object.values(data)
    const [mapType, setMapType] = useState("Pie");

    // let wansById = Object.assign({}, ...wans.map(x=> ({[x.hostname]:x})))
    //how often is it lan vs wan count
    //get array of objects, {wanamt, lanamt, time of day}
    //every hour, get wan/lan counts and push to array of 24 hours
    // let lwans = wans.length;
    // let llans = lans.length;
    // (getMinutes(Date.now()) >= 0) && dayArray.push({'wan': lwans, 'lan': llans, 'hour': format(new Date(),'H:mm') })
    // console.log(dayArray);
 
    
    let within8Hours = data.filter( x => differenceInHours(new Date(), new Date(x.uptime)) <= 8)
    let within24Hours = data.filter( x => differenceInHours(new Date(), new Date(x.uptime)) <= 24 )
    let under7Days = data.filter( x => differenceInDays(new Date(), new Date(x.uptime)) <= 7 )
    let under30Days = data.filter( x => differenceInDays(new Date(), new Date(x.uptime)) <= 29 )
    let over30Days = data.filter( x => differenceInDays(new Date(), new Date(x.uptime)) > 29 )

    const graphData = [
        { name: 'Under 8h', value: (within8Hours.length)},
        { name: 'Under 24h', value: (within24Hours.length - within8Hours.length) },
        { name: 'This Week', value: (under7Days.length - within24Hours.length) },
        { name: 'This Month', value: (under30Days.length - under7Days.length) },
        { name: 'Older...', value: over30Days.length },
      
    ];
  
    // const colors = ['rgba(255, 27, 27, 0.8)','rgba(179, 27, 27, 0.8)','rgba(193, 131, 54, 0.8)','rgba(81, 129, 115, 0.8)','rgba(52, 153, 81, 0.8)','rgba(35, 165, 121, .8)','rgba(55, 186, 214, 0.8)']
    let colors = chroma.scale(['#639b76','#ff8675']).mode('lrgb').colors(graphData.length)
    return (
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
        mapType === "Pie" ) ? (
        <PieChart style={{fontSize:"12px"}}>
          <Legend layout="vertical" align="left" verticalAlign="middle" iconSize={10} iconType="diamond"/>
          <Tooltip />
          <Pie 
          data={graphData} 
          cx="50%" 
          cy="50%" 
          dataKey="value" 
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={false} //should be able to remove this prop, I think there is a bug in Pie stopping labels from rendering. This is a temp fix.  
          >
            {
              graphData.map( (entry,index) => (
                <Cell key={`wedge-${index}`} fill={colors[index]} className="pieWedge"/> 
              ))
            }
          </Pie>
          <LabelList dataKey="value" position="top" />
        </PieChart>
        ) : ( mapType === "Bar" ) ? (
          <BarChart 
          style={{fontSize:"12px"}} 
          data={graphData} 
          startAngle={180} 
          endAngle={0}>
            <XAxis dataKey="name" />
            <YAxis scale="sqrt"/>
            <Tooltip />
            <Bar dataKey="value" isAnimationActive={false}>
            { 
              graphData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]}/>
              ))
            }
            </Bar>
          </BarChart>
        ) : (<div />)
        }
      </ResponsiveContainer>
      <Typography variant="subtitle2"> Uptime </Typography>
      </div>
    );
    
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
  )(UptimeGraph);