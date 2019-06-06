import React from 'react';
import { connect } from "react-redux";
import { 
  ResponsiveContainer, Cell, Legend, Tooltip, 
  BarChart, Bar, XAxis, YAxis, 
  PieChart, Pie, LabelList
} from 'recharts';
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
  let mapType = "Bar";
  data = Object.values(data);
  let uptimeData = getUnique(data,"os_build")
  const colors = ['rgba(35, 165, 121, .8)','rgba(52, 153, 81, 0.8)','rgba(81, 129, 115, 0.8)','rgba(193, 131, 54, 0.8)','rgba(179, 27, 27, 0.8)','rgba(255, 27, 27, 0.8)','rgba(55, 186, 214, 0.8)']
   
  if (uptimeData) { 
  return (
    <div style={{ backgroundColor: "#eee"}}>
      <ResponsiveContainer height={250} width="100%">
      { (mapType === "Bar") ? (
        <BarChart style={{fontSize:"12px"}} data={uptimeData} startAngle={180} endAngle={0}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" isAnimationActive={false}>
          { 
            uptimeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]}  strokeWidth={index === 2 ? 4 : 1}/>
            ))
          }
          </Bar>
        </BarChart>
      ) : (mapType === "Pie") ? (
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
        <LabelList dataKey="uv" position="top" />
      </PieChart>
      ) : (<div> Please Select Chart Type </div>)
      }
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