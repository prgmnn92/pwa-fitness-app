import React from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";

import { sumUpSets, sumUpWeight, getTimeString } from "../../utility";

import "./complete.styles.scss";

const Complete = ({ workoutData, time }) => {
  const history = useHistory();

  return (
    <div className="complete">
      <div className="complete__header">
        <div className="complete__return" onClick={() => history.goBack()}>
          &larr;
        </div>
        <div className="complete__text">Uebersicht</div>
        <div className="complete__check">&#10003;</div>
      </div>

      <h2 className="h2-heading">Improvisiertes Training</h2>
      <div className="complete__notes">Notizen</div>
      <div className="complete__container">
        <div className="complete__small-container">
          <div className="complete__icon complete__icon--duration">I</div>
          <p>Dauer:</p>
          <p>{getTimeString(time)}</p>
        </div>
        <div className="complete__small-container">
          <div className="complete__icon complete__icon--sets">I</div>
          <p>Saetze:</p>
          <p>{sumUpSets(workoutData)}</p>
        </div>
        <div className="complete__small-container">
          <div className="complete__icon complete__icon--weight">I</div>
          <p>Gewicht:</p>
          <p>{sumUpWeight(workoutData)}</p>
        </div>
      </div>

      <div className="complete__history">
        {Object.keys(workoutData).map((key) => {
          return (
            <React.Fragment>
              <p className="complete__list-title">{key}</p>
              <ul className="complete__list">
                {workoutData[key].map((set) =>
                  set.Complete ? (
                    <li className="complete__item">
                      {set.Gewicht} kg x {set.Wiederholungen} Wdh.
                    </li>
                  ) : null
                )}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  workoutData: state.workout.workoutData,
  time: state.ui.time,
});

export default connect(mapStateToProps)(Complete);
