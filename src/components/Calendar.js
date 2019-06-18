import React, { Component } from "react";

import classnames from "../classnames";
import locales from "../locales";

import PlainButton from "./buttons/PlainButton";

const getPrevMonthFillDays = (visibleYear, visibleMonth) => {
  const daysInPrevMonth = new Date(visibleYear, visibleMonth, 0).getDate();
  const firstDayOfWeek = new Date(visibleYear, visibleMonth, 1).getDay();

  const days = [];

  const prevYear = visibleYear - (visibleMonth === 0 ? 1 : 0);
  const prevMonth = (visibleMonth - 1 + 12) % 12;

  for (let idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
    days.push({ year: prevYear, month: prevMonth, day: daysInPrevMonth - idx });
  }

  return days;
};

const getCurrentMonthDays = (visibleYear, visibleMonth) => {
  const maxDay = new Date(visibleYear, visibleMonth + 1, 0).getDate();
  const days = [];

  for (let day = 1; day <= maxDay; day += 1) {
    days.push({ year: visibleYear, month: visibleMonth, day });
  }

  return days;
};

const getNextMonthFillDays = (visibleYear, visibleMonth) => {
  const lastDayOfWeek = new Date(visibleYear, visibleMonth + 1, 0).getDay();
  const days = [];

  const nextYear = visibleYear + (visibleMonth === 11 ? 1 : 0);
  const nextMonth = (visibleMonth + 1) % 12;

  for (let idx = lastDayOfWeek; idx < 6; idx += 1) {
    days.push({ year: nextYear, month: nextMonth, day: idx - lastDayOfWeek + 1 });
  }

  return days;
};

const CalendarDays = ({ value, visibleYear, visibleMonth, onChange }) => {
  const valueHash = `${value.year}-${value.month}-${value.day}`;
  const days = [
    ...getPrevMonthFillDays(visibleYear, visibleMonth),
    ...getCurrentMonthDays(visibleYear, visibleMonth),
    ...getNextMonthFillDays(visibleYear, visibleMonth)
  ];

  return days.map(({ year, month, day }) => {
    const dayDateHash = `${year}-${month}-${day}`;
    const onClick = () => onChange(year, month, day);

    const className = classnames("chq-cal--day", {
      "chq-cal--day-act": (dayDateHash === valueHash),
      "chq-cal--day-out": (month !== visibleMonth)
    });

    return (
      <PlainButton key={dayDateHash} className={className} onClick={onClick}>
        {day}
      </PlainButton>
    );
  });
};

const getValue = (year, month, day) => {
  if (year) {
    return { year, month, day };
  }

  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  };
};

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleYear: props.year || new Date().getFullYear(),
      visibleMonth: props.month || new Date().getMonth()
    };
  }

  componentDidUpdate(prevProps) {
    const { year, month } = this.props;
    const { visibleYear, visibleMonth } = this.state;

    if ((prevProps.year != year) || (prevProps.month !== month)) {
      if ((year != visibleYear) || (month != visibleMonth)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ visibleYear: year, visibleMonth: month });
      }
    }
  }

  handlePrevMonthClick = () => {
    this.setState(({ visibleYear, visibleMonth }) => {
      const nextVisibleDate = new Date(visibleYear, visibleMonth - 1, 1);

      return {
        visibleYear: nextVisibleDate.getFullYear(),
        visibleMonth: nextVisibleDate.getMonth()
      };
    });
  };

  handleNextMonthClick = () => {
    this.setState(({ visibleYear, visibleMonth }) => {
      const nextVisibleDate = new Date(visibleYear, visibleMonth + 1, 1);

      return {
        visibleYear: nextVisibleDate.getFullYear(),
        visibleMonth: nextVisibleDate.getMonth()
      };
    });
  };

  render() {
    const { onChange, year, month, day } = this.props;
    const { visibleYear, visibleMonth } = this.state;

    return (
      <div className="chq-cal">
        <div className="chq-cal--head">
          <button
            type="button"
            className="chq-cal--head--prev"
            onClick={this.handlePrevMonthClick}
            aria-label="Previous month"
          >
            <em className="chq-cal--head--ct" />&nbsp;
          </button>
          <button
            type="button"
            className="chq-cal--head--next"
            onClick={this.handleNextMonthClick}
            aria-label="Next month"
          >
            <em className="chq-cal--head--ct" />&nbsp;
          </button>
          <div className="chq-cal--head--lbl">
            {locales.en.monthNames[visibleMonth]}
            {" "}
            {visibleYear}
          </div>
        </div>
        <div className="chq-cal--months">
          {locales.en.dayAbbrs.map(abbr => (
            <strong key={abbr}>{abbr}</strong>
          ))}
        </div>
        <div className="chq-cal--days">
          <CalendarDays
            value={getValue(year, month, day)}
            visibleYear={visibleYear}
            visibleMonth={visibleMonth}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
