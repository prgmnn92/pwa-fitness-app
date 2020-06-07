import React, { Component } from "react";
import Calendar from "react-calendar";

import "./progress.styles.scss";

export class Progress extends Component {
  render() {
    return (
      <div className="progress">
        <div className="progress__calendar">
          <Calendar />
        </div>
        <div className="progress__timeline">TIMELINE</div>
      </div>
    );
  }
}

export default Progress;
