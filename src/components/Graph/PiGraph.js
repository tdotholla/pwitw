import React from 'react';
import { ResponsiveContainer, Cell, PieChart, Pie, Legend, LabelList, Tooltip } from 'recharts';
import { isToday, isYesterday, isThisWeek, isThisMonth, isThisQuarter } from "date-fns";
import { Flipper, Flipped } from "react-flip-toolkit";

import { isHome } from "../../functions";

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
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PiGraph = props => {
  let {data, drawerWidth} = props;
  data = Object.values(data)
  let wans = data.filter( x => !isHome(x.ip_local) )
  let lans = data.filter( x => isHome(x.ip_local) )
  let wasToday = data.filter( x => isToday(new Date(x._changed)) )
  let wasYesterday = data.filter( x => isYesterday(new Date(x._changed)) )
  let wasThisWeek = data.filter( x => isThisWeek(new Date(x._changed)) )
  let wasThisMonth = data.filter( x => isThisMonth(new Date(x._changed)) )
  let wasThisQuarter = data.filter( x => isThisQuarter(new Date(x._changed)) )

  const data01 = [
    { name: 'WAN', value: wans.length }, { name: 'LAN', value: lans.length }
  ];
  const data02 = [
    { name: 'Pinged Today', value: wasToday.length },
    { name: 'Yesterday', value: wasYesterday.length },
    { name: 'This Week', value: wasThisWeek.length },
    { name: 'This Month', value: wasThisMonth.length },
    { name: 'This Quarter', value: wasThisQuarter.length },
  ];

  const colors01 = ['rgba(238, 59, 14, 0.8)','rgba(55, 186, 214, 0.8)']
  const colors02 = ['rgba(234, 230, 205, .8)','rgba(132, 187, 181, 0.8)','rgba(81, 129, 115, 0.8)','rgba(193, 131, 54, 0.8)','rgba(179, 27, 27, 0.8)']


  return (

    <ResponsiveContainer height={drawerWidth*(3/4)} width="100%">
      <PieChart>
        <Legend layout="vertical" align="left" verticalAlign="middle" iconSize={10} iconType="diamond"/>
        <Tooltip />
        <Pie 
        data={data01} 
        cx="50%" 
        cy="50%" 
        dataKey="value" 
        outerRadius="50%" 
        labelLine={false}
        label={renderCustomizedLabel}
        isAnimationActive={false} //should be able to remove this prop, I think there is a bug in Pie stopping labels from rendering. This is a temp fix.  
        >
          {
            data01.map( (entry,index) => (
              <Cell key={`wedge-${index}`} fill={colors01[index]} className="pieWedge"/> 
            ))
          }
        </Pie>
        <Pie 
        data={data02} 
        cx="50%" 
        cy="50%" 
        dataKey="value" 
        innerRadius="50%" 
        outerRadius="80%" 
        label 
        isAnimationActive={false} //should be able to remove this prop, I think there is a bug in Pie stopping labels from rendering. This is a temp fix.
        > 
        {
          data02.map( (entry,index) => (
            <Cell key={`sector-${index}`} fill={colors02[index]} className="pieSector"/>
          ))
        }
        </Pie>
        <LabelList dataKey="uv" position="top" />
      </PieChart>
    </ResponsiveContainer>
  );
  
}

export default PiGraph;