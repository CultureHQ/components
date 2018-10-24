import React, { Component } from "react";

import classnames from "../classnames";
import PlainButton from "./buttons/PlainButton";

const locales = {
  en: {
    DAY_ABBRS: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    MONTH_NAMES: [
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
      "December"
    ]
  }
};

class CalendarDay extends Component {
  handleClick = () => {
    const { onClick, label } = this.props;

    onClick(label);
  };

  render() {
    const { label, isActive, outside } = this.props;

    const classList = classnames("chq-cal--day", {
      "chq-cal--day-act": isActive,
      "chq-cal--day-out": outside
    });

    return (
      <PlainButton className={classList} onClick={this.handleClick}>
        {label}
      </PlainButton>
    );
  }
}

class Calendar extends Component {
  handlePastDayClick = label => {
    const { onChange, value } = this.props;

    onChange(new Date(value.getFullYear(), value.getMonth() - 1, label));
  };

  handlePresentDayClick = label => {
    const { onChange, value } = this.props;

    onChange(new Date(value.getFullYear(), value.getMonth(), label));
  };

  handleFutureDayClick = label => {
    const { onChange, value } = this.props;

    onChange(new Date(value.getFullYear(), value.getMonth() + 1, label));
  };

  getDays() {
    const { value } = this.props;

    const daysInMonth = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(value.getFullYear(), value.getMonth(), 0).getDate();

    const firstDayOfWeek = new Date(value.getFullYear(), value.getMonth(), 1).getDay();
    const lastDayOfWeek = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDay();
    const currentDate = value.getDate();

    const days = [];

    for (let idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
      days.push(
        <CalendarDay
          key={`prev-${daysInPrevMonth - idx}`}
          label={daysInPrevMonth - idx}
          onClick={this.handlePastDayClick}
          outside
        />
      );
    }

    for (let idx = 1; idx <= daysInMonth; idx += 1) {
      days.push(
        <CalendarDay
          key={idx}
          label={idx}
          onClick={this.handlePresentDayClick}
          isActive={idx === currentDate}
        />
      );
    }

    for (let idx = lastDayOfWeek; idx < 6; idx += 1) {
      days.push(
        <CalendarDay
          key={`next-${idx - lastDayOfWeek + 1}`}
          label={idx - lastDayOfWeek + 1}
          onClick={this.handleFutureDayClick}
          outside
        />
      );
    }

    return days;
  }

  render() {
    const { value } = this.props;

    return (
      <div className="chq-cal">
        <div className="chq-cal--head">
          {locales.en.MONTH_NAMES[value.getMonth()]} {value.getFullYear()}
        </div>
        <div className="chq-cal--months">
          {locales.en.DAY_ABBRS.map(abbr => (
            <strong key={abbr}>{abbr}</strong>
          ))}
        </div>
        <div className="chq-cal--days">
          {this.getDays()}
        </div>
      </div>
    );
  }
}

export default Calendar;
