import React from "react";

import "./quick-start.styles.scss";

class QuickStart extends React.Component {
  render() {
    return (
      <div className="quick-start">
        <div className="quick-start__nav">
          <div className="quick-start__return">return</div>
          <div className="quick-start__time">01:31</div>
          <div className="quick-start__complete">complete</div>
        </div>
        <div className="quick-start__container">
          <div className="element">BANK....</div>
        </div>
        <button className="btn btn--add">Uebung hinzufuegen</button>
      </div>
    );
  }
}

export default QuickStart;
