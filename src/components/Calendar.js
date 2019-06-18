import React, { Component } from "react";

import classnames from "../classnames";
import locales from "../locales";

import PlainButton from "./buttons/PlainButton";

const getVisibleState = date => {
  const visibleValue = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);

  return {
    visibleYear: visibleValue.getUTCFullYear(),
    visibleMonth: visibleValue.getUTCMonth()
  };
};

const getPrevMonthFillDays = (visibleYear, visibleMonth) => {
  const daysInPrevMonth = new Date(visibleYear, visibleMonth, 0).getUTCDate();
  const firstDayOfWeek = new Date(visibleYear, visibleMonth, 1).getUTCDay();

  const days = [];

  const prevYear = visibleYear - (visibleMonth === 0 ? 1 : 0);
  const prevMonth = (visibleMonth - 1 + 12) % 12;

  for (let idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
    days.push({ year: prevYear, month: prevMonth, day: daysInPrevMonth - idx });
  }

  return days;
};

const getCurrentMonthDays = (visibleYear, visibleMonth) => {
  const maxDay = new Date(visibleYear, visibleMonth + 1, 0).getUTCDate();
  const days = [];

  for (let day = 1; day <= maxDay; day += 1) {
    days.push({ year: visibleYear, month: visibleMonth, day });
  }

  return days;
};

const getNextMonthFillDays = (visibleYear, visibleMonth) => {
  const lastDayOfWeek = new Date(visibleYear, visibleMonth + 1, 0).getUTCDay();
  const days = [];

  const nextYear = visibleYear + (visibleMonth === 11 ? 1 : 0);
  const nextMonth = (visibleMonth + 1) % 12;

  for (let idx = lastDayOfWeek; idx < 6; idx += 1) {
    days.push({ year: nextYear, month: nextMonth, day: idx - lastDayOfWeek + 1 });
  }

  return days;
};

const CalendarDays = ({ value, visibleYear, visibleMonth, onChange }) => {
  const valueHash = `${value.getUTCFullYear()}-${value.getUTCMonth()}-${value.getUTCDate()}`;
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

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = getVisibleState(props.value || new Date());
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    const { visibleYear, visibleMonth } = this.state;

    if (
      prevProps.value !== value
      && `${value.getUTCFullYear()}-${value.getUTCMonth()}` !== `${visibleYear}-${visibleMonth}`
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(getVisibleState(value));
    }
  }

  handlePrevMonthClick = () => {
    this.setState(({ visibleYear, visibleMonth }) => (
      getVisibleState(new Date(visibleYear, visibleMonth - 1, 1))
    ));
  };

  handleNextMonthClick = () => {
    this.setState(({ visibleYear, visibleMonth }) => (
      getVisibleState(new Date(visibleYear, visibleMonth + 1, 1))
    ));
  };

  render() {
    const { onChange, value } = this.props;
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
            value={value || new Date()}
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
