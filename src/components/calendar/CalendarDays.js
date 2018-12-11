import React from "react";

import classnames from "../../classnames";
import CalendarDay from "./CalendarDay";

const getPrevMonthFillDays = visibleValue => {
  const visibleYear = visibleValue.getUTCFullYear();
  const visibleMonth = visibleValue.getUTCMonth();

  const daysInPrevMonth = new Date(visibleYear, visibleMonth, 0).getUTCDate();
  const firstDayOfWeek = new Date(visibleYear, visibleMonth, 1).getUTCDay();

  const days = [];

  const prevYear = visibleYear - (visibleMonth === 0 ? 1 : 0);
  const prevMonth = (visibleMonth - 1 + 12) % 12;

  for (let idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
    days.push([prevYear, prevMonth, daysInPrevMonth - idx]);
  }

  return days;
};

const getCurrentMonthDays = value => {
  const year = value.getUTCFullYear();
  const month = value.getUTCMonth();

  const maxDay = new Date(year, month + 1, 0).getUTCDate();
  const days = [];

  for (let day = 1; day <= maxDay; day += 1) {
    days.push([year, month, day]);
  }

  return days;
};

const getNextMonthFillDays = visibleValue => {
  const visibleYear = visibleValue.getUTCFullYear();
  const visibleMonth = visibleValue.getUTCMonth();

  const lastDayOfWeek = new Date(visibleYear, visibleMonth + 1, 0).getUTCDay();
  const days = [];

  const nextYear = visibleYear + (visibleMonth === 11 ? 1 : 0);
  const nextMonth = (visibleMonth + 1) % 12;

  for (let idx = lastDayOfWeek; idx < 6; idx += 1) {
    days.push([nextYear, nextMonth, idx - lastDayOfWeek + 1]);
  }

  return days;
};

const CalendarDays = ({ value, visibleValue, onChange }) => {
  const valueHash = `${value.getUTCFullYear()}-${value.getUTCMonth()}-${value.getUTCDate()}`;
  const visibleMonth = visibleValue.getUTCMonth();

  const days = [
    ...getPrevMonthFillDays(visibleValue),
    ...getCurrentMonthDays(visibleValue),
    ...getNextMonthFillDays(visibleValue)
  ];

  return days.map(([year, month, day]) => {
    const dayDateHash = `${year}-${month}-${day}`;

    const className = classnames("chq-cal--day", {
      "chq-cal--day-act": (dayDateHash === valueHash),
      "chq-cal--day-out": (month !== visibleMonth)
    });

    return (
      <CalendarDay
        key={dayDateHash}
        year={year}
        month={month}
        day={day}
        className={className}
        onClick={onChange}
      />
    );
  });
};

export default CalendarDays;
