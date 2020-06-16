import React from "react";

import "./plan-creator.styles.scss";

class PlanCreator extends React.Component {
  render() {
    return (
      <div className="plan-creator">
        <h2 className="h2-heading">Plan erstellen</h2>
        <div className="plan-creator__top-container">
          <input id="name" type="text" className="plan-creator__input" />
          <label htmlFor="name">Name</label>
          <button className="btn btn--plus"></button>
        </div>

        <div className="plan-creator__bottom-container">
          <div className="plan-creator__element">Uebung 1</div>
          <button className="btn btn--add">Uebung hinzufuegen</button>
        </div>
      </div>
    );
  }
}

export default PlanCreator;
