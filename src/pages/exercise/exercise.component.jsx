import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Context } from "../../provider";

import SetContainer from "../../components/set-container/set-container.component";

import "./exercise.styles.scss";

const Exercise = () => {
  const { exerciseName } = useParams();
  const [sets, setSets] = useState([]);
  const history = useHistory();

  return (
    <div className="exercise">
      <div className="exercise__return" onClick={() => history.goBack()}>
        &larr;
      </div>
      <h2 className="exercise__name">{exerciseName}</h2>

      <Context.Consumer>
        {(context) => {
          return context.state.quickStart[exerciseName].map((set, id) => (
            <SetContainer id={id} key={id} data={set} />
          ));
        }}
      </Context.Consumer>
      {/* {sets.map((set) => set)} */}
      <button
        className="btn btn--add-set"
        onClick={() => setSets([...sets, <SetContainer />])}
      >
        <span className="exercise__icon exercise__icon--plus">+</span>Satz
        hinzufuegen
      </button>
    </div>
  );
};

export default Exercise;
