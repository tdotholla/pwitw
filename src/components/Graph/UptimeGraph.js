import React from 'react';
import { connect } from "react-redux";
import { 
  ResponsiveContainer, Legend, Tooltip, 
  PieChart, Pie, Cell, LabelList 
} from 'recharts';
import { differenceInMinutes, isToday, isYesterday, isThisWeek, isThisMonth, isThisQuarter,} from "date-fns";
// import { Flipper, Flipped } from "react-flip-toolkit";

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
  
    // let wansById = Object.assign({}, ...wans.map(x=> ({[x.hostname]:x})))
    //how often is it lan vs wan count
    //get array of objects, {wanamt, lanamt, time of day}
    //every hour, get wan/lan counts and push to array of 24 hours
    // let lwans = wans.length;
    // let llans = lans.length;
    // (getMinutes(Date.now()) >= 0) && dayArray.push({'wan': lwans, 'lan': llans, 'hour': format(new Date(),'H:mm') })
    // console.log(dayArray);
  
  
    let withinHour = data.filter( x => differenceInMinutes(new Date(), new Date(x.uptime)) < 60 )
    let wasToday = data.filter( x => isToday(new Date(x.uptime)) && (differenceInMinutes(new Date(), new Date(x.uptime)) >= 60)  )
    let wasYesterday = data.filter( x => isYesterday(new Date(x.uptime)) )
    let wasThisWeek = data.filter( x => isThisWeek(new Date(x.uptime)) )
    let wasThisMonth = data.filter( x => isThisMonth(new Date(x.uptime)) )
    let wasThisQuarter = data.filter( x => isThisQuarter(new Date(x.uptime)) )
  
    const graphData = [
        { name: 'Older...', value: wasThisQuarter.length - wasThisMonth.length },
        { name: 'This Month', value: wasThisMonth.length - wasThisWeek.length},
        { name: 'This Week', value: wasThisWeek.length - wasYesterday.length - wasToday.length - withinHour.length},
        { name: 'Yesterday', value: wasYesterday.length },
        { name: 'Today', value: wasToday.length - withinHour.length},
        { name: 'Restarted Recently', value: withinHour.length },
      
    ];
  
    const colors = ['rgba(255, 27, 27, 0.8)','rgba(179, 27, 27, 0.8)','rgba(193, 131, 54, 0.8)','rgba(81, 129, 115, 0.8)','rgba(52, 153, 81, 0.8)','rgba(35, 165, 121, .8)','rgba(55, 186, 214, 0.8)']
   
    return (
      <div style={{ backgroundColor: "#eee"}}>
      <ResponsiveContainer height={250} width="100%">
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
          <LabelList dataKey="uv" position="top" />
        </PieChart>
      </ResponsiveContainer>
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