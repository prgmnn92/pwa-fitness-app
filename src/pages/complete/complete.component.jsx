import React from "react";

import "./complete.styles.scss";

const Complete = () => (
  <div className="complete">
    <div className="complete__header">
      <div className="complete__return">&larr;</div>
      <div className="complete__text">Uebersicht</div>
      <div className="complete__check">&#10003;</div>
    </div>

    <h2 className="h2-heading">Improvisiertes Training</h2>
    <div className="complete__notes">Notizen</div>
    <div className="complete__container">
      <div className="complete__duration">
        <div className="complete__icon complete__icon--duration">I</div>
        <p>Dauer:</p>
        <p>20:00</p>
      </div>
      <div className="complete__sets">
        <div className="complete__icon complete__icon--sets">I</div>
        <p>Saetze:</p>
        <p>20</p>
      </div>
      <div className="complete__weight">
        <div className="complete__icon complete__icon--weight">I</div>
        <p>Gewicht:</p>
        <p>100kg</p>
      </div>
    </div>

    <div className="complete__history">
      <p className="complete__list-title"></p>
      <ul className="complete__list">
        <li className="complete__item">10 kg x 1 Wdh.</li>
        <li className="complete__item">10 kg x 1 Wdh.</li>
      </ul>
    </div>
  </div>
);

export default Complete;
