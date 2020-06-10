import React from "react";

import "./set-container.styles.scss";

const SetContainer = () => (
  <div className="set-container">
    <div className="set-container__set">
      <span>Satz 1</span>
      <div className="set-container__menu">&middot;</div>
    </div>

    <div className="set-container__box">
      <div className="set-container__icon--minus">-</div>
      <div className="set-container__box-content">
        <p>Gewicht (kg)</p>
        <span>2.5</span>
      </div>
      <div className="set-container__icon--plus">-</div>
    </div>
    <div className="set-container__box">
      <div className="set-container__icon--minus">-</div>
      <div className="set-container__box-content">
        <p>Wiederholungen</p>
        <span>1</span>
      </div>
      <div className="set-container__icon--plus">-</div>
    </div>
    <button className="btn btn--complete">Satz abschliessen</button>
  </div>
);

export default SetContainer;
