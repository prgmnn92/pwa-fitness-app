import React from "react";
import { connect } from "react-redux";

import { resetWorkout } from "../../redux/workout/workout.actions";

import WeekView from "../../components/week-view/week-view.component";
import BigButton from "../../components/big-button/big-button.component";

import { ReactComponent as Plus } from "../../assets/img/SVG/plus.svg";
import { ReactComponent as Play } from "../../assets/img/SVG/play3.svg";

import "./homepage.styles.scss";

const Homepage = ({ resetWorkout }) => (
  <div className="homepage">
    <WeekView />

    <BigButton url="/plan-creator" Icon={Plus}>
      Plan erstellen
    </BigButton>

    <BigButton url="/quick-start" Icon={Play} clickHandler={resetWorkout}>
      Schnellstart
    </BigButton>
  </div>
);

const mapDisptachToProps = (dispatch) => ({
  resetWorkout: () => dispatch(resetWorkout()),
});

export default connect(null, mapDisptachToProps)(Homepage);
