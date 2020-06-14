import React from "react";
import { withRouter } from "react-router";

import { Context } from "../../provider";
import { convertObjectForExerciseBox } from "../../utility";

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
    this.startTimer();
  }

  addNameHandler = () => {
    this.setState({ addingExercise: false });
  };

  getTimeString = () =>
    ("00" + Math.floor(this.state.time / 60000)).slice(-2) +
    ":" +
    ("00" + Math.floor((this.state.time / 1000) % 60)).slice(-2);

  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time,
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start,
        }),
      1
    );
  };

  render() {
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
                }
              }}
            >
              &larr;
            </div>
            <div className="quick-start__time">{this.getTimeString()}</div>
            <div className="quick-start__complete">Complete</div>
          </div>
          <div className="quick-start__container">
            <Context.Consumer>
              {(context) =>
                convertObjectForExerciseBox(
                  context.state.quickStart
                ).map((exercise, id) => (
                  <ExerciseBox data={exercise} id={id} key={id} />
                ))
              }
            </Context.Consumer>
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
          <Context.Consumer>
            {(context) => (
              <button
                onClick={() => {
                  context.addExercise(this.state.exerciseName);
                  this.setState({
                    addingExercise: false,
                  });
                }}
                className="btn btn--confirm"
              >
                Confirm
              </button>
            )}
          </Context.Consumer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(QuickStart);
