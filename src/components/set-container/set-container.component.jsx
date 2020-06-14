import React, { useState } from "react";
import { connect } from "react-redux";

import "./set-container.styles.scss";
import { completeSet } from "../../redux/workout/workout.actions";

const SetContainer = ({ workoutData, id, completeSet, name }) => {
  const [weight, setWeight] = useState(workoutData[name][id].Gewicht);
  const [reps, setReps] = useState(workoutData[name][id].Wiederholungen);

  return (
    <div className="set-container">
      <div className="set-container__set">
        <span>Satz {id + 1}</span>
        <div className="set-container__menu">&middot;</div>
      </div>

      <div className="set-container__box">
        <div
          className="set-container__icon set-container__icon--minus"
          onClick={() => {
            if (weight <= 0) return;
            return !workoutData[name][id].Complete && setWeight(weight - 2.5);
          }}
        ></div>
        <div className="set-container__box-content">
          <p>Gewicht (kg)</p>
          <span>{weight}</span>
        </div>
        <div
          className="set-container__icon set-container__icon--plus"
          onClick={() =>
            !workoutData[name][id].Complete && setWeight(weight + 2.5)
          }
        ></div>
      </div>
      <div className="set-container__box">
        <div
          className="set-container__icon set-container__icon--minus"
          onClick={() => {
            if (reps <= 0) return;
            return !workoutData[name][id].Complete && setReps(reps - 1);
          }}
        ></div>
        <div className="set-container__box-content">
          <p>Wiederholungen</p>
          <span>{reps}</span>
        </div>
        <div
          className="set-container__icon set-container__icon--plus"
          onClick={() => !workoutData[name][id].Complete && setReps(reps + 1)}
        ></div>
      </div>
      <button
        disabled={workoutData[name][id].Complete}
        className="btn btn--complete"
        onClick={() => completeSet(name, id, weight, reps)}
      >
        Satz abschliessen
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  workoutData: state.workout.workoutData,
});

const mapDispatchToProps = (dispatch) => ({
  completeSet: (name, number, weight, reps) =>
    dispatch(completeSet(name, number, weight, reps)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetContainer);
