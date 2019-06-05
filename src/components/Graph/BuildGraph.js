import React from 'react';
import { connect } from "react-redux";
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { differenceInMinutes, isToday, isYesterday, isThisWeek, isThisMonth, isThisQuarter,} from "date-fns";
// import { Flipper, Flipped } from "react-flip-toolkit";

import * as ACTIONS from "../../actions/actionConstants";
import { isHome, getUnique } from "../../functions";

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

const BuildGraph = props => {
  let {data} = props;
  data = Object.values(data)
  let uptimeData = getUnique(data,"os_build")
  const colors01 = ['rgba(238, 59, 14, 0.8)','rgba(55, 186, 214, 0.8)']
  const colors02 = ['rgba(35, 165, 121, .8)','rgba(52, 153, 81, 0.8)','rgba(81, 129, 115, 0.8)','rgba(193, 131, 54, 0.8)','rgba(179, 27, 27, 0.8)','rgba(255, 27, 27, 0.8)']
   
  if (uptimeData) { 
  return (
    <div style={{ backgroundColor: "#eee"}}>
    <ResponsiveContainer height={250} width="100%">
      <BarChart style={{fontSize:"12px"}} data={uptimeData} startAngle={180} endAngle={0}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" isAnimationActive={false}>
        { 
          uptimeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors02[index]}  strokeWidth={index === 2 ? 4 : 1}/>
          ))
        }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
  } else {return <div />}
  
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