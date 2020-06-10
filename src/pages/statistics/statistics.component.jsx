import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import "./statistics.styles.scss";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

export class Statistics extends Component {
  state = {
    windowWidth: 200,
  };
  componentDidMount() {
    this.setState({
      windowWidth: window.width,
    });
  }
  render() {
    return (
      <div className="statistics">
        <h2 className="h2-heading">Statistics</h2>
        <div className="statistics__btn-container">
          <button className="btn btn--outline" id="">
            Woche
          </button>
          <button className="btn btn--outline" id="">
            Monat
          </button>
          <button className="btn btn--outline" id="">
            Jahr
          </button>
          <button className="btn btn--outline" id="">
            Gesamt
          </button>
        </div>
        <div className="date-nav">
          <span className="date-nav__arr-left">&lang;</span>
          <span className="date-nav__content">1. Juni - 8. Juni</span>
          <span className="date-nav__arr-right">&rang;</span>
        </div>
        <h3 className="h3-heading">Allgemein</h3>
        <div className="statistics__small-box">Sitzungen: 0</div>
        <div className="statistics__small-box">Gesamtzeit: 0min</div>
        <div className="statistics__small-box">&#216; Sitzungsdauer: 0min</div>
        <div className="statistics__small-box">Saetze ges.: 0</div>
        <div className="statistics__big-box">
          <BarChart
            width={325}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={20} />
            <Tooltip />
            {/* <Legend hide /> */}
            <Bar dataKey="pv" fill="#348f50" />
            <Bar dataKey="uv" fill="#56b4d3" />
          </BarChart>
        </div>
        <h3 className="h3-heading">Uebungen</h3>
        <div className="statistics__big-box">
          <LineChart
            width={325}
            height={300}
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis width={20} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {/* <Legend hide /> */}
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#348f50"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#56b4d3" />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default Statistics;
