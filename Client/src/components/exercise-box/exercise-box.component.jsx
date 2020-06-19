import React, { useState } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import "./exercise-box.styles.scss";
import {
  removeExercise,
  resetExercise,
} from "../../redux/workout/workout.actions";

const ExerciseBox = ({
  data: { name, completedSets, openSets },
  id,
  removeExercise,
  resetExercise,
}) => {
  const [menu, setMenu] = useState(false);

  const kebab = (
    <div className="kebab" onClick={() => setMenu(!menu)}>
      <figure></figure>
      <figure
        className={menu ? "kebab__middle active" : "kebab__middle"}
      ></figure>
      <p className={menu ? "kebab__cross active" : "kebab__cross"}>x</p>
      <figure></figure>
      <ul className={menu ? "kebab__dropdown active" : "kebab__dropdown"}>
        <li>
          <span href="#" onClick={() => removeExercise(name)}>
            Loeschen
          </span>
        </li>
        <li>
          <span href="#" onClick={() => resetExercise(name)}>
            Reset
          </span>
        </li>
      </ul>
    </div>
  );

  return (
    <div
      className="exercise-box"
      //onClick={() => (showMenu ? setShowMenu(false) : null)}
    >
      <div className="exercise-box__number">{id + 1}</div>
      <Link className="exercise-box__link" to={`/exercise/${name}`}>
        <span className="exercise-box__title">{name}</span>
        <span className="exercise-box__sets">
          {completedSets}/{openSets} Saetze abgeschlossen
        </span>
      </Link>

      {kebab}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeExercise: (name) => dispatch(removeExercise(name)),
  resetExercise: (name) => dispatch(resetExercise(name)),
});

export default connect(null, mapDispatchToProps)(ExerciseBox);
