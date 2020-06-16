import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addSet } from "../../redux/workout/workout.actions";

import SetContainer from "../../components/set-container/set-container.component";

import "./exercise.styles.scss";

const Exercise = ({ workoutData, addSet }) => {
  const { exerciseName } = useParams();
  const history = useHistory();

  return (
    <div className="exercise">
      <div className="exercise__return" onClick={() => history.goBack()}>
        &larr;
      </div>
      <h2 className="exercise__name">{exerciseName}</h2>

      {workoutData[exerciseName].map((set, id) => (
        <SetContainer name={exerciseName} id={id} key={id} data={set} />
      ))}

      <button className="btn btn--add-set" onClick={() => addSet(exerciseName)}>
        <span className="exercise__icon exercise__icon--plus">+</span>Satz
        hinzufuegen
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  workoutData: state.workout.workoutData,
});

const mapDispatchToProps = (dispatch) => ({
  addSet: (name) => dispatch(addSet(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
