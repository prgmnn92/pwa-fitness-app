import React from "react";
import { connect } from "react-redux";

import { showTimeline } from "../../redux/workout/workout.actions";

import "./calendar.styles.scss";

class Calendar extends React.Component {
  state = {
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
  };

  componentDidMount() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    this.setState({
      ...this.state,
      currentMonth,
      currentYear,
      month: currentMonth,
      year: currentYear,
    });

    this.setCalendar(new Date(currentYear, currentMonth, 1));
  }

  setMonth = (date) => {
    const month = date.getMonth();
    const lastMonth = month === 0 ? 11 : month - 1;
    const nextMonth = month === 11 ? 0 : month + 1;

    this.setState({
      lastMonth,
      month,
      nextMonth,
    });

    return { lastMonth, month, nextMonth };
  };

  checkWeek(year, workoutData, weekArr) {
    // array mit [[MONAT, TAG, JAHR], [MONAT, TAG, JAHR]]....
    let obj = {};

    let newData = [];

    Object.keys(workoutData).forEach((key) => {
      newData.push(workoutData[key]);
    });

    let splittedDates =
      newData.length > 0
        ? newData.map((workout) => {
            if (workout.date !== undefined) {
              return workout.date.split("/");
            }
            return null;
          })
        : null;

    splittedDates.forEach((date) => {
      obj[date[0] + date[1] + date[2]] = true;
    });

    let checkedWeek = weekArr.map((day) => {
      let calcMonth = day.month + 1;

      calcMonth = ("00" + calcMonth).slice(-2);
      let calcDay = ("00" + day.value).slice(-2);

      return obj[calcDay + calcMonth + year]
        ? {
            ...day,
            class: day.class + " active",
          }
        : day;
    });

    return checkedWeek;
  }

  createCalendarData(year, workoutData, ...weeks) {
    return weeks.map((week, id) => {
      return {
        id: "week-" + (id + 1),
        data: this.checkWeek(year, workoutData, week),
      };
    });
  }

  setCalendar = (date) => {
    const { lastMonth, month, nextMonth } = this.setMonth(date);
    const year = date.getFullYear();
    const weekday = date.getDay();
    const days = this.checkLeapYear(year);
    let nextMonthDay = 0;
    console.log(year);
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

    console.log(firstWeek);

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
      calendar: this.createCalendarData(
        year,
        this.props.pastWorkoutData,
        firstWeek,
        secondWeek,
        thirdWeek,
        forthWeek,
        fifthWeek,
        sixthWeek
      ),
    });
  };

  checkLeapYear = (year) => {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    this.setState({
      days,
    });
    return days;
  };

  previousCalendar = () => {
    const month = this.state.month !== 0 ? this.state.month - 1 : 11;
    const year = this.state.month !== 0 ? this.state.year : this.state.year - 1;
    this.setCalendar(new Date(year, month, 1));
  };

  nextCalendar = () => {
    const month = this.state.month !== 11 ? this.state.month + 1 : 0;
    const year =
      this.state.month !== 11 ? this.state.year : this.state.year + 1;
    this.setCalendar(new Date(year, month, 1));
  };

  render() {
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
            {week.data.map((day) =>
              day.class !== undefined ? (
                <div
                  onClick={() => this.props.showTimeline(this.state.year, day)}
                  key={`${day.month}${day.value}`}
                  className={`calendar__day ${day.class}`}
                >
                  {day.value < 10 && day.value !== " "
                    ? `0${day.value}`
                    : day.value}
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pastWorkoutData: state.workout.pastWorkoutData,
});

const mapDispatchToProps = (dispatch) => ({
  showTimeline: (year, day) => dispatch(showTimeline(year, day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
