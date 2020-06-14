import React, { useState } from "react";

import "./set-container.styles.scss";

const SetContainer = ({ data: { Wiederholungen, Gewicht, Complete }, id }) => {
  const [weight, setWeight] = useState(Gewicht);
  const [reps, setReps] = useState(Wiederholungen);

  return (
    <div className="set-container">
      <div className="set-container__set">
        <span>Satz {id + 1}</span>
        <div className="set-container__menu">&middot;</div>
      </div>

      <div className="set-container__box">
        <div
          className="set-container__icon set-container__icon--minus"
          onClick={() => setWeight(weight - 2.5)}
        ></div>
        <div className="set-container__box-content">
          <p>Gewicht (kg)</p>
          <span>{weight}</span>
        </div>
        <div
          className="set-container__icon set-container__icon--plus"
          onClick={() => setWeight(weight + 2.5)}
        ></div>
      </div>
      <div className="set-container__box">
        <div
          className="set-container__icon set-container__icon--minus"
          onClick={() => setReps(reps - 1)}
        ></div>
        <div className="set-container__box-content">
          <p>Wiederholungen</p>
          <span>{reps}</span>
        </div>
        <div
          className="set-container__icon set-container__icon--plus"
          onClick={() => setReps(reps + 1)}
        ></div>
      </div>
      <button disabled={Complete} className="btn btn--complete">
        Satz abschliessen
      </button>
    </div>
  );
};
export default SetContainer;
