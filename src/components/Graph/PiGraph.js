import React from 'react';
import { ResponsiveContainer, Cell, PieChart, Pie, LabelList, Tooltip } from 'recharts';
import { isToday, isYesterday, isThisWeek, isThisMonth, isThisQuarter } from "date-fns";
import { Flipper, Flipped } from "react-flip-toolkit";

import { isHome } from "../../functions";

//want amount of ppl out vs ppl in (inside chart)
//
//want groups of logins (<8 hrs, <24, <1wk 1wk>)

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
    { name: 'Last Logon: Today', value: wasToday.length },
    { name: 'Last Logon: Yesterday', value: wasYesterday.length },
    { name: 'Last Logon: This Week', value: wasThisWeek.length },
    { name: 'Last Logon: This Month', value: wasThisMonth.length },
    { name: 'Last Logon: This Quarter', value: wasThisQuarter.length },
  ];

  const colors01 = ['#ee3b0e','#37bad6']
  const colors02 = ['#eae6cd','#84bbb5','#518173','#c18336','#B31B1B']

  return (
    <ResponsiveContainer height={drawerWidth*(3/4)} width="100%">
      <PieChart height={drawerWidth} width={drawerWidth}>
        <Tooltip />
        <Pie data={data01} cx="50%" cy="50%" dataKey="value" outerRadius="37%">
        {
          data01.map( (entry,index) => (
            <Cell key={`wedge-${index}`} fill={colors01[index]}/> 
          ))
        }
        </Pie>
        <Pie data={data02} cx="50%" cy="50%" dataKey="value" innerRadius="40%" outerRadius="80%" label labelLine> 
        {
          data02.map( (entry,index) => (
            <Cell key={`sector-${index}`} fill={colors02[index]} />
          ))
        }
        </Pie>
        <LabelList dataKey="uv" position="top" />
      </PieChart>
    </ResponsiveContainer>
  );
  
}

export default PiGraph;