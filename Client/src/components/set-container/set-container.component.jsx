import React, { useState } from "react";
import { connect } from "react-redux";

import "./set-container.styles.scss";
import { completeSet, removeSet } from "../../redux/workout/workout.actions";

const SetContainer = ({ workoutData, id, completeSet, name, removeSet }) => {
  const [weight, setWeight] = useState(workoutData[name][id].Gewicht);
  const [reps, setReps] = useState(workoutData[name][id].Wiederholungen);
  const [complete, setComplete] = useState(workoutData[name][id].Complete);
  const [menu, setMenu] = useState(false);

  const handlerSets = () => {
    setComplete(true);
    completeSet(name, id, weight, reps);
  };

  const resetSet = () => {
    setWeight(0);
    setReps(0);
    setComplete(false);
  };

  const kebab = (
    <div className="kebab" onClick={() => setMenu(!menu)}>
      <figure></figure>
      <figure
        className={menu ? "kebab__middle active" : "kebab__middle"}
      ></figure>
      <p className={menu ? "kebab__cross active" : "kebab__cross"}>x</p>
      <figure></figure>
      <ul className={menu ? "kebab__dropdown active" : "kebab__dropdown"}>
        {complete ? (
          <li>
            <span href="#" onClick={() => setComplete(false)}>
              Oeffnen
            </span>
          </li>
        ) : null}
        <li>
          <span href="#" onClick={() => removeSet(name, id)}>
            Loeschen
          </span>
        </li>
        <li>
          <span href="#" onClick={() => resetSet()}>
            Reset
          </span>
        </li>
      </ul>
    </div>
  );

  return complete ? (
    <div className="set-container-complete">
      <span>Satz {id + 1} abgeschlossen</span>
      {kebab}
    </div>
  ) : (
    <div className="set-container">
      <div className="set-container__set">
        <span>Satz {id + 1}</span>
        {kebab}
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
        disabled={complete}
        className="btn btn--complete"
        onClick={() => handlerSets()}
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
  removeSet: (name, id) => dispatch(removeSet(name, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetContainer);
