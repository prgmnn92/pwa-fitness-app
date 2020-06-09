import React from "react";

import "./calendar.styles.scss";

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      lastMonth: 11,
      month: 0,
      nextMonth: 1,
      year: 0,
      currentMonth: 0,
      currentYear: 0,
      calendar: [
        { id: "week-1", data: [0, 0, 0, 0, 0, 0, 0] },
        { id: "week-2", data: [0, 0, 0, 0, 0, 0, 0] },
        { id: "week-3", data: [0, 0, 0, 0, 0, 0, 0] },
        { id: "week-4", data: [0, 0, 0, 0, 0, 0, 0] },
        { id: "week-5", data: [0, 0, 0, 0, 0, 0, 0] },
        { id: "week-6", data: [0, 0, 0, 0, 0, 0, 0] },
      ],
      holidays: [],
      holiday: "",
    };

    this.previousCalendar = this.previousCalendar.bind(this);
    this.nextCalendar = this.nextCalendar.bind(this);
  }

  componentWillMount() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    this.setState({
      currentMonth,
      currentYear,
      month: currentMonth,
      year: currentYear,
    });

    this.setCalendar(new Date(currentYear, currentMonth, 1));
  }

  setMonth(date) {
    const month = date.getMonth();
    const lastMonth = month === 0 ? 11 : month - 1;
    const nextMonth = month === 11 ? 0 : month + 1;

    this.setState({
      lastMonth,
      month,
      nextMonth,
    });

    return { lastMonth, month, nextMonth };
  }

  setCalendar(date) {
    const { lastMonth, month, nextMonth } = this.setMonth(date);
    const year = date.getFullYear();
    const weekday = date.getDay();
    const days = this.checkLeapYear(year);
    let nextMonthDay = 0;

    const firstWeek = this.state.calendar[0].data.map((day, index) => {
      if (index < weekday) {
        const value = days[lastMonth] - (weekday - index) + 1;
        return {
          value,
          class: "calendar__day--soft",
          month: lastMonth,
        };
      }
      return {
        value: index - weekday + 1,
        class: "",
        month,
      };
    });
    const secondWeek = this.state.calendar[0].data.map((day, index) => {
      const value = firstWeek[6].value + index + 1;
      return {
        value,
        class: "",
        month,
      };
    });
    const thirdWeek = this.state.calendar[0].data.map((day, index) => {
      const value = secondWeek[6].value + index + 1;
      return {
        value,
        class: "",
        month,
      };
    });
    const forthWeek = this.state.calendar[0].data.map((day, index) => {
      const value = thirdWeek[6].value + index + 1;
      return {
        value,
        class: "",
        month,
      };
    });
    const fifthWeek = this.state.calendar[0].data.map((day, index) => {
      if (forthWeek[6].value + index + 1 > days[month]) {
        nextMonthDay += 1;
        return {
          value: nextMonthDay,
          class: "calendar__day--soft",
          month: nextMonth,
        };
      }
      const value = forthWeek[6].value + index + 1;
      return {
        value,
        class: "",
        month,
      };
    });
    const sixthWeek = this.state.calendar[0].data.map((day, index) => {
      if (
        fifthWeek[6].value + index + 1 > days[month] ||
        fifthWeek[6].value < 10
      ) {
        nextMonthDay += 1;
        return {
          value: nextMonthDay,
          class: "calendar__day--soft",
          month: nextMonth,
        };
      }

      const value = fifthWeek[6].value + index + 1;
      return {
        value,
        class: "",
        month,
      };
    });

    this.setState({
      month,
      year,
      calendar: [
        { id: "week-1", data: firstWeek },
        { id: "week-2", data: secondWeek },
        { id: "week-3", data: thirdWeek },
        { id: "week-4", data: forthWeek },
        { id: "week-5", data: fifthWeek },
        { id: "week-6", data: sixthWeek },
      ],
    });
  }

  checkLeapYear(year) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    this.setState({
      days,
    });
    return days;
  }

  previousCalendar() {
    const month = this.state.month !== 0 ? this.state.month - 1 : 11;
    const year = this.state.month !== 0 ? this.state.year : this.state.year - 1;
    this.setCalendar(new Date(year, month, 1));
  }

  nextCalendar() {
    const month = this.state.month !== 11 ? this.state.month + 1 : 0;
    const year =
      this.state.month !== 11 ? this.state.year : this.state.year + 1;
    this.setCalendar(new Date(year, month, 1));
  }

  render() {
    console.log(this.state.calendar);
    return (
      <div className="calendar">
        <div className="calendar__header">
          <span className="calendar__button-container">
            <button
              onClick={this.previousCalendar}
              className="calendar__button-content calendar__button-content--left"
            />
          </span>
          <span className="calendar__date">{`${this.state.year} ${
            this.state.months[this.state.month]
          }`}</span>
          <span className="calendar__button-container">
            <button
              onClick={this.nextCalendar}
              className="calendar__button-content calendar__button-content--right"
            />
          </span>
        </div>
        <div className="calendar__week">
          {this.state.weekDays.map((weekDay) => (
            <div key={weekDay} className="calendar__weekday">
              {weekDay}
            </div>
          ))}
        </div>
        {this.state.calendar.map((week) => (
          <div key={week.id} className="calendar__week">
            {week.data.map((day) => (
              <div
                key={`${day.month}${day.value}`}
                className={`calendar__day ${day.class}`}
              >
                {day.value < 10 && day.value !== " "
                  ? `0${day.value}`
                  : day.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
