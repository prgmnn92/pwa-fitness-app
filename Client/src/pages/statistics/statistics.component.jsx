import React, { Component } from "react";
import { connect } from "react-redux";
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

import { getWeekString, getMonthString, getYearString } from "../../utility";

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
    totalWorkouts: 0,
    totalTime: "",
    averageTime: "",
    totalSets: 0,
    weekOperator: 0,
    displayMode: "ALL",
  };

  modes = {
    WEEK: "WEEK",
    MONTH: "MONTH",
    YEAR: "YEAR",
    ALL: "ALL",
  };

  componentDidMount() {
    // INITIAL MODE
    this.setMode(this.modes.ALL);

    if (this.props.pastWorkoutData === undefined) return;
    let totalMinutes = 0,
      totalSeconds = 0,
      totalSets = 0;

    let totalWorkouts = Object.keys(this.props.pastWorkoutData).length;
    Object.keys(this.props.pastWorkoutData).forEach((key) => {
      //Handle undefined duration
      if (this.props.pastWorkoutData[key].duration !== undefined) {
        let [minutes, seconds] = this.props.pastWorkoutData[key].duration.split(
          ":"
        );

        totalMinutes += Number(minutes);
        totalSeconds += Number(seconds);
      }

      console.log(totalMinutes);
      this.props.pastWorkoutData[key].exercises.forEach((exercise) => {
        totalSets += exercise.sets.length;
      });
    });

    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds %= 60;

    let tmpTime = (totalMinutes * 60 + totalSeconds) / totalWorkouts;
    let averageTime = Math.floor(tmpTime / 60) + ":" + Math.floor(tmpTime % 60);

    this.setState({
      totalWorkouts: totalWorkouts,
      totalTime: totalMinutes + ":" + totalSeconds,
      averageTime: averageTime,
      totalSets: totalSets,
    });
  }

  setMode = (mode) => {
    this.setState({
      ...this.state,
      displayMode: this.modes[mode],
    });
  };

  getNavString = (mode) => {
    switch (mode) {
      case this.modes.WEEK:
        return getWeekString(this.state.weekOperator);
      case this.modes.MONTH:
        return getMonthString(this.state.weekOperator);
      case this.modes.YEAR:
        return getYearString(this.state.weekOperator);
      case this.modes.ALL:
        return "Gesamt";
      default:
        return "error";
    }
  };

  weekStats = (date) => {
    // date => 'TAG/MONAT/JAHR'
    //daten werden auf aktuelle woche reduziert
    // welche daten sind die aktuelle woche // welche bedingung ??
  };
  monthStats = (date) => {
    //daten werden auf aktuellen monat reduziert
    //alle daten mit monat und aktuellem jahr
  };
  yearStats = (date) => {
    //daten werden auf aktuelles jahr reduziert
    // alle daten mit  jahr
  };
  overallStats = () => {
    //alle daten werden angezeigt
  };

  render() {
    const { WEEK, MONTH, YEAR, ALL } = this.modes;
    return (
      <div className="statistics">
        <h2 className="h2-heading">Statistics</h2>
        <div className="statistics__btn-container">
          <button
            onClick={() => this.setMode(WEEK)}
            className="btn btn--outline"
            id=""
          >
            Woche
          </button>
          <button
            onClick={() => this.setMode(MONTH)}
            className="btn btn--outline"
            id=""
          >
            Monat
          </button>
          <button
            onClick={() => this.setMode(YEAR)}
            className="btn btn--outline"
            id=""
          >
            Jahr
          </button>
          <button
            onClick={() => this.setMode(ALL)}
            className="btn btn--outline"
            id=""
          >
            Gesamt
          </button>
        </div>
        <div className="date-nav">
          <span
            onClick={() =>
              this.setState({ weekOperator: this.state.weekOperator - 1 })
            }
            className="date-nav__arr-left"
          >
            &lang;
          </span>
          <span className="date-nav__content">
            {this.getNavString(this.state.displayMode)}
          </span>
          <span
            onClick={() =>
              this.setState({ weekOperator: this.state.weekOperator + 1 })
            }
            className="date-nav__arr-right"
          >
            &rang;
          </span>
        </div>
        <h3 className="h3-heading">Allgemein</h3>
        <div className="statistics__small-box">
          Sitzungen: {this.state.totalWorkouts}
        </div>
        <div className="statistics__small-box">
          Gesamtzeit: {this.state.totalTime}
        </div>
        <div className="statistics__small-box">
          &#216; Sitzungsdauer: {this.state.averageTime}
        </div>
        <div className="statistics__small-box">
          Saetze ges.: {this.state.totalSets}
        </div>
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

const mapStateToProps = (state) => ({
  pastWorkoutData: state.workout.pastWorkoutData,
});

export default connect(mapStateToProps)(Statistics);
