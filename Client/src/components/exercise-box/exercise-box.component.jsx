import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./exercise-box.styles.scss";

const ExerciseBox = ({ data: { name, completedSets, openSets }, id }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="exercise-box"
      onClick={() => (showMenu ? setShowMenu(false) : null)}
    >
      <div className="exercise-box__number">{id + 1}</div>
      <Link className="exercise-box__link" to={`/exercise/${name}`}>
        <span className="exercise-box__title">{name}</span>
        <span className="exercise-box__sets">
          {completedSets}/{openSets} Saetze abgeschlossen
        </span>
      </Link>

      <div
        className="exercise-box__menu"
        onClick={() => setShowMenu(true)}
      ></div>
      <div
        className={
          showMenu
            ? "exercise-box__menu-dialog exercise-box__menu-dialog--active"
            : "exercise-box__menu-dialog"
        }
      >
        <ul>
          <li>Ersetzen</li>
          <li>Loeschen</li>
        </ul>
      </div>
    </div>
  );
};

export default ExerciseBox;
