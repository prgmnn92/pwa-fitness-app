import React from "react";

import { Link } from "react-router-dom";

import "./big-button.styles.scss";

const BigButton = ({ Icon, children, url }) => (
  <button className="btn">
    <Link className="btn__link" to={url}>
      <div className="btn__icon">
        <Icon />
      </div>
      <span className="btn__text">{children}</span>
    </Link>
  </button>
);

export default BigButton;
