import React from "react";
import { connect } from "react-redux";

import "./timeline.styles.scss";

const Timeline = ({ timeline }) => (
  <div className="timeline">
    <div className="timeline__date">Freitag, 5. Juni</div>
    <div className="timeline__content">
      {timeline?.body ? timeline?.body : null}
    </div>
  </div>
);
const mapStateToProps = (state) => ({
  timeline: state.workout.timeline,
});

export default connect(mapStateToProps)(Timeline);
