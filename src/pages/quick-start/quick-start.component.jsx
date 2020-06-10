import React from "react";

import ExerciseBox from "../../components/exercise-box/exercise-box.component";
import Modal from "../../components/modal/modal.component";

import "./quick-start.styles.scss";

class QuickStart extends React.Component {
  state = {
    addingExercise: false,
  };

  addNameHandler = () => {
    this.setState({ addingExercise: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="quick-start">
          <div className="quick-start__nav">
            <div className="quick-start__return">&larr;</div>
            <div className="quick-start__time">01:31</div>
            <div className="quick-start__complete">Complete</div>
          </div>
          <div className="quick-start__container">
            <ExerciseBox />
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
          />
          <button className="btn btn--confirm">Confirm</button>
        </Modal>
      </React.Fragment>
    );
  }
}

export default QuickStart;
