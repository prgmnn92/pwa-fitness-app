import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { stopTime } from "../../redux/ui/ui.actions";
import { resetWorkout, addExercise } from "../../redux/workout/workout.actions";
import {
  hideNavbar,
  showNavbar,
  startTime,
  resetTime,
} from "../../redux/ui/ui.actions";
import { convertObjectForExerciseBox, getTimeString } from "../../utility";

import ExerciseBox from "../../components/exercise-box/exercise-box.component";
import Modal from "../../components/modal/modal.component";

import "./quick-start.styles.scss";

class QuickStart extends React.Component {
  state = {
    addingExercise: false,
    exerciseName: "",
    time: 0,
    start: 0,
    isOn: false,
  };

  componentDidMount() {
    const { hideNavbar, startTime } = this.props;

    hideNavbar();
    startTime();
  }
  addNameHandler = () => {
    this.setState({ addingExercise: false });
  };

  render() {
    const {
      workoutData,
      addExercise,
      showNavbar,
      time,
      resetTime,
      resetWorkout,
      stopTime,
    } = this.props;
    return (
      <React.Fragment>
        <div className="quick-start">
          <div className="quick-start__nav">
            <div
              className="quick-start__return"
              onClick={() => {
                let confirm = window.confirm(
                  "Willst du wirklich zurueckkehren? Die Trainingsdaten gehen damit verloren."
                );
                if (confirm) {
                  this.props.history.goBack();
                  showNavbar();
                  resetTime();
                  resetWorkout();
                }
              }}
            >
              &larr;
            </div>
            <div className="quick-start__time">{getTimeString(time)}</div>
            <div className="quick-start__complete" onClick={() => stopTime()}>
              <Link to="/complete">Abschliessen</Link>
            </div>
          </div>
          <div className="quick-start__container">
            {convertObjectForExerciseBox(workoutData).map((exercise, id) => (
              <ExerciseBox data={exercise} id={id} key={id} />
            ))}
          </div>
          <button
            className="btn btn--add"
            onClick={() => this.setState({ addingExercise: true })}
          >
            Uebung hinzufuegen
          </button>
        </div>
        <Modal
          show={this.state.addingExercise}
          modalClosed={this.addNameHandler}
        >
          <input
            type="text"
            className="input-exercise"
            placeholder="Titel der Uebung"
            onChange={(e) => this.setState({ exerciseName: e.target.value })}
          />

          <button
            onClick={() => {
              if (this.state.exerciseName === "") return;
              addExercise(this.state.exerciseName);
              this.setState({
                addingExercise: false,
              });
            }}
            className="btn btn--confirm"
          >
            Confirm
          </button>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  workoutData: state.workout.workoutData,
  time: state.ui.time,
});

const mapDispatchToProps = (dispatch) => ({
  addExercise: (name) => dispatch(addExercise(name)),
  resetWorkout: () => dispatch(resetWorkout()),
  hideNavbar: () => dispatch(hideNavbar()),
  showNavbar: () => dispatch(showNavbar()),
  resetTime: () => dispatch(resetTime()),
  startTime: () => startTime(dispatch),
  stopTime: () => dispatch(stopTime()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(QuickStart));
