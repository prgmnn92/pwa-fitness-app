import React from "react";

import "./week-view.styles.scss";

const WeekView = () => (
  <div className="week-view">
    <ul className="week-view__list">
      <li className="week-view__item">
        <div className="week-view__text">Mo.</div>
        <div className="week-view__number">01</div>
      </li>
      <li className="week-view__item">
        <div className="week-view__text">Di.</div>
        <div className="week-view__number week-view__day--number--active">
          02
        </div>
      </li>
      <li className="week-view__item">
        <div className="week-view__text">Mi.</div>
        <div className="week-view__number">03</div>
      </li>
      <li className="week-view__item">
        <div className="week-view__text">Do.</div>
        <div className="week-view__number">04</div>
      </li>
      <li className="week-view__item week-view__item--active">
        <div className="week-view__text">Fr.</div>
        <div className="week-view__number">05</div>
      </li>
      <li className="week-view__item">
        <div className="week-view__text">Sa.</div>
        <div className="week-view__number">06</div>
      </li>
      <li className="week-view__item">
        <div className="week-view__text">So.</div>
        <div className="week-view__number">07</div>
      </li>
    </ul>
  </div>
);

export default WeekView;
