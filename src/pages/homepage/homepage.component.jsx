import React, { Component } from "react";

import WeekView from "../../components/week-view/week-view.component";
import BigButton from "../../components/big-button/big-button.component";

import { ReactComponent as Plus } from "../../assets/img/SVG/plus.svg";
import { ReactComponent as Play } from "../../assets/img/SVG/play3.svg";

import "./homepage.styles.scss";

export class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <WeekView />
        <BigButton Icon={Plus}>Plan erstellen</BigButton>
        <BigButton Icon={Play}>Schnellstart</BigButton>
      </div>
    );
  }
}

export default Homepage;
