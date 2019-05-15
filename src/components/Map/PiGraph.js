import React from 'react';
import {
  PieChart, Pie, LabelList, Legend
} from 'recharts';
import { isToday, isYesterday, isThisWeek, isThisMonth, isThisQuarter } from "date-fns";
import { isHome } from "../../functions";

//want amount of ppl out vs ppl in (inside chart)
//
//want groups of logins (<8 hrs, <24, <1wk 1wk>)

const PiGraph = props => {
  const {data} = props;

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
    { name: 'Was Today', value: wasToday.length },
    { name: 'Was Yesterday', value: wasYesterday.length },
    { name: 'Was This Week', value: wasThisWeek.length },
    { name: 'Was This Month', value: wasThisMonth.length },
    { name: 'Was This Quarter', value: wasThisQuarter.length },
  ];

  return (
      <PieChart width={200} height={200}>
        <Legend />
        <Pie data={data01} labeldataKey="value" cx={100} cy={100} outerRadius={60}  />

        <Pie data={data02} cx={100} cy={100} dataKey="value" innerRadius={65} outerRadius={75} label />
            <LabelList dataKey="uv" position="top" />

      </PieChart>
    );
}

export default PiGraph;