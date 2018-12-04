import React from "react";

import classnames from "../../classnames";
import CalendarDay from "./CalendarDay";

const hashMonth = date => `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
const hashDate = date => `${hashMonth(date)}-${date.getUTCDate()}`;

const CalendarDays = ({ value, visibleValue, onChange }) => {
  const visibleYear = visibleValue.getUTCFullYear();
  const visibleMonth = visibleValue.getUTCMonth();

  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getUTCDate();
  const daysInPrevMonth = new Date(visibleYear, visibleMonth, 0).getUTCDate();

  const firstDayOfWeek = new Date(visibleYear, visibleMonth, 1).getUTCDay();
  const lastDayOfWeek = new Date(visibleYear, visibleMonth + 1, 0).getUTCDay();

  const days = [];

  for (let idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
    days.push(new Date(Date.UTC(visibleYear, visibleMonth - 1, daysInPrevMonth - idx)));
  }

  for (let idx = 1; idx <= daysInMonth; idx += 1) {
    days.push(new Date(Date.UTC(visibleYear, visibleMonth, idx)));
  }

  for (let idx = lastDayOfWeek; idx < 6; idx += 1) {
    days.push(new Date(Date.UTC(visibleYear, visibleMonth + 1, idx - lastDayOfWeek + 1)));
  }

  const valueDateHash = hashDate(value);
  const visibleValueMonthHash = hashMonth(visibleValue);

  return days.map(day => {
    const dayDateHash = hashDate(day);

    const className = classnames("chq-cal--day", {
      "chq-cal--day-act": (dayDateHash === valueDateHash),
      "chq-cal--day-out": (hashMonth(day) !== visibleValueMonthHash)
    });

    return (
      <CalendarDay
        key={dayDateHash}
        day={day}
        className={className}
        onClick={onChange}
      />
    );
  });
};

export default CalendarDays;
