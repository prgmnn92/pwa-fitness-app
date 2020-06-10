import React from "react";

import "./backdrop.styles.scss";

const backdrop = ({ clicked, show }) =>
  show ? <div className="backdrop" onClick={clicked}></div> : null;

export default backdrop;
