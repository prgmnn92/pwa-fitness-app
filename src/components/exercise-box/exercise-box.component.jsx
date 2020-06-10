import React from "react";

import { Link } from "react-router-dom";

import "./exercise-box.styles.scss";

const ExerciseBox = () => (
  <div className="exercise-box">
    <div className="exercise-box__number">1</div>
    <span className="exercise-box__title">Bankdruecken</span>
    <span className="exercise-box__sets">1/3 Saetze abgeschlossen</span>
    <div className="exercise-box__menu">&middot;</div>
  </div>
);

export default ExerciseBox;
