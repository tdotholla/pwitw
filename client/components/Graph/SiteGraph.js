import React from 'react';
import { connect } from "react-redux";
import { ResponsiveContainer, Cell, PieChart, Pie, Legend, LabelList, Tooltip } from 'recharts';
import { differenceInMinutes, differenceInHours, differenceInDays, isToday, isYesterday, isThisWeek, isThisMonth, isThisQuarter,} from "date-fns";
import chroma from 'chroma-js';

// import { Flipper, Flipped } from "react-flip-toolkit";
import Typography from '@material-ui/core/Typography';

import * as ACTIONS from "../../../client/actions/actionConstants";
import { isHome, getUniqueSum } from "../../../client/functions"

  // let dayArray = []
//want amount of ppl out vs ppl in (inside chart)
//
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

const SiteGraph = props => {
  let {data} = props;
  let wans = data.filter( x => !isHome(x.ipv4_address) )
  let lans = data.filter( x => isHome(x.ipv4_address) )

  let withinHour = data.filter( x => differenceInMinutes(new Date(), new Date(x.logon_time_UTC)) <= 60 )
  let within24Hours = data.filter( x => differenceInHours(new Date(), new Date(x.logon_time_UTC)) <= 24)
  let within48Hours = data.filter( x => differenceInHours(new Date(), new Date(x.logon_time_UTC)) <= 48)
  let under7Days = data.filter( x => differenceInDays(new Date(), new Date(x.logon_time_UTC)) <= 7 )
  let under30Days = data.filter( x => differenceInDays(new Date(), new Date(x.logon_time_UTC)) <= 30 )
  let over30Days = data.filter( x => differenceInDays(new Date(), new Date(x.logon_time_UTC)) > 30 )
  
  const locationData = [
    { name: 'WAN', value: wans.length }, { name: 'LAN', value: lans.length }
  ];
  const pingData = [
    { name: 'Under 1h', value: withinHour.length },
    { name: 'Under 24h', value: (within24Hours.length - withinHour.length)},
    { name: 'Under 48h', value: (within48Hours.length - within24Hours.length) },
    { name: 'This Week', value: (under7Days.length - within48Hours.length) },
    { name: 'This Month', value: (under30Days.length - under7Days.length) },
    { name: 'Older...', value: over30Days.length },
  ];
  // console.log(under7Days.length, (under7Days.length - within48Hours.length - within24Hours.length - withinHour.length) , (under30Days.length - under7Days.length - within48Hours.length - within24Hours.length - withinHour.length))
  const locationColors = chroma.scale(['#f7cd00','#5577d1']).colors(2)
  const pingColors = chroma.scale(['#ff8675','#639b76']).colors(pingData.length)

  const officeData = getUniqueSum(data,"site");
  const dataColors = chroma.scale(['#ff8675','#639b76']).colors(officeData.length)

  return (
    <div style={{ backgroundColor: "#eee"}}>
    <ResponsiveContainer height={250} width="50%">
      <PieChart style={{fontSize:"12px"}}>
        <Legend layout="vertical" align="left" verticalAlign="middle" iconSize={10} iconType="diamond"/>
        <Tooltip />

        <Pie 
        data={locationData} 
        cx="50%" 
        cy="50%" 
        dataKey="value" 
        outerRadius="50%" 
        labelLine={false}
        // onClick={() => updateList(wansById)} //onClick, update state.stations.byId with data01
        label={renderCustomizedLabel}
        isAnimationActive={false} //should be able to remove this prop, I think there is a bug in Pie stopping labels from rendering. This is a temp fix.  
        >
          {
            locationData.map( (entry,index) => (
              <Cell key={`wedge-${index}`} fill={locationColors[index]} className="pieWedge"/> 
            ))
          }
        </Pie>
        <Pie 
        data={pingData.sort((a,b) => a.value - b.value)} 
        cx="50%" 
        cy="50%" 
        dataKey="value" 
        innerRadius="50%" 
        outerRadius="80%" 
        label 
        isAnimationActive={false} //should be able to remove this prop, I think there is a bug in Pie stopping labels from rendering. This is a temp fix.
        > 
        {
          pingData.map( (entry,index) => (
            <Cell key={`sector-${index}`} fill={pingColors[index]} className={`pieSector-${index}`}/>
          ))
        }
        </Pie>
        <LabelList dataKey="uv" position="top" />
      </PieChart>
    </ResponsiveContainer>
    <ResponsiveContainer height={250} width="50%">
    <PieChart>
        <Pie 
          data={officeData} 
          cx="50%" 
          cy="50%" 
          dataKey="value" 
          outerRadius="50%" 
          labelLine={false}
          // onClick={() => updateList(wansById)} //onClick, update state.stations.byId with data01
          label={renderCustomizedLabel}
          isAnimationActive={false} //should be able to remove this prop, I think there is a bug in Pie stopping labels from rendering. This is a temp fix.  
          >
            {
            officeData.map( (entry,index) => (
              <Cell key={`sector-${index}`} fill={pingColors[index]} className={`pieSector-${index}`}/>
            ))
          }
          </Pie>
      </PieChart>
    </ResponsiveContainer>
    <Typography variant="subtitle2"> Network Data </Typography>
    </div>
  );
  
}

export default SiteGraph;