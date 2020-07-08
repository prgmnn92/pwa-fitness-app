import React from "react";
import moment from "moment";

import { getActualWeekDay } from "../../utility";

import "./week-view.styles.scss";

const WeekView = () => {
  const handleItemClass = (dayNumber) => {
    return getActualWeekDay(dayNumber) === moment().format("DD")
      ? "week-view__item week-view__item--active"
      : "week-view__item";
  };

  return (
    <div className="week-view">
      <ul className="week-view__list">
        <li className={handleItemClass(0)}>
          <div className="week-view__text">Mo.</div>
          <div className="week-view__number">{getActualWeekDay(0)}</div>
        </li>
        <li className={handleItemClass(1)}>
          <div className="week-view__text">Di.</div>
          <div className="week-view__number">{getActualWeekDay(1)}</div>
        </li>
        <li className={handleItemClass(2)}>
          <div className="week-view__text">Mi.</div>
          <div className="week-view__number">{getActualWeekDay(2)}</div>
        </li>
        <li className={handleItemClass(3)}>
          <div className="week-view__text">Do.</div>
          <div className="week-view__number">{getActualWeekDay(3)}</div>
        </li>
        <li className={handleItemClass(4)}>
          <div className="week-view__text">Fr.</div>
          <div className="week-view__number">{getActualWeekDay(4)}</div>
        </li>
        <li className={handleItemClass(5)}>
          <div className="week-view__text">Sa.</div>
          <div className="week-view__number">{getActualWeekDay(5)}</div>
        </li>
        <li className={handleItemClass(6)}>
          <div className="week-view__text">So.</div>
          <div className="week-view__number">{getActualWeekDay(6)}</div>
        </li>
      </ul>
    </div>
  );
};

export default WeekView;
