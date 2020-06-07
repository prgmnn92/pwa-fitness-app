import React from "react";

import { Link } from "react-router-dom";

import "./big-button.styles.scss";

const BigButton = ({ Icon, children }) => (
  <button className="btn">
    <Link className="btn__link" to="#">
      <div className="btn__icon">
        <Icon />
      </div>
      <span className="btn__text">{children}</span>
    </Link>
  </button>
);

export default BigButton;
