import React, { useEffect, useMemo, useState } from "react";

import classnames from "../classnames";
import locales from "../locales";

import PlainButton from "./buttons/PlainButton";

const getPrevMonthFillValues = visible => {
  const daysInPrevMonth = new Date(visible.year, visible.month, 0).getDate();
  const firstDayOfWeek = new Date(visible.year, visible.month, 1).getDay();

  const values = [];

  const prevYear = visible.year - (visible.month === 0 ? 1 : 0);
  const prevMonth = (visible.month - 1 + 12) % 12;

  for (let idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
    values.push({ year: prevYear, month: prevMonth, day: daysInPrevMonth - idx, fill: true });
  }

  return values;
};

const getCurrentMonthValues = visible => {
  const maxDay = new Date(visible.year, visible.month + 1, 0).getDate();
  const values = [];

  for (let day = 1; day <= maxDay; day += 1) {
    values.push({ year: visible.year, month: visible.month, day, fill: false });
  }

  return values;
};

const getNextMonthFillValues = visible => {
  const lastDayOfWeek = new Date(visible.year, visible.month + 1, 0).getDay();
  const values = [];

  const nextYear = visible.year + (visible.month === 11 ? 1 : 0);
  const nextMonth = (visible.month + 1) % 12;

  for (let idx = lastDayOfWeek; idx < 6; idx += 1) {
    values.push({ year: nextYear, month: nextMonth, day: idx - lastDayOfWeek + 1, fill: true });
  }

  return values;
};

const makeActiveHash = (year, month, day) => {
  if (year !== null && month !== null && day !== null) {
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

const Calendar = ({ year = null, month = null, day = null, onChange }) => {
  const [visible, setVisible] = useState(() => ({
    year: year === null ? new Date().getFullYear() : year,
    month: month === null ? new Date().getMonth() : month
  }));

  useEffect(
    () => {
      if (
        (year !== null)
        && (month !== null)
        && ((year !== visible.year) || (month !== visible.month))
      ) {
        setVisible({ year, month });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [year, month]
  );

  const onPrevMonthClick = () => setVisible(current => {
    const nextVisible = new Date(current.year, current.month - 1, 1);

    return { year: nextVisible.getFullYear(), month: nextVisible.getMonth() };
  });

  const onNextMonthClick = () => setVisible(current => {
    const nextVisible = new Date(current.year, current.month + 1, 1);

    return { year: nextVisible.getFullYear(), month: nextVisible.getMonth() };
  });

  const activeHash = makeActiveHash(year, month, day);
  const values = useMemo(
    () => [
      ...getPrevMonthFillValues(visible),
      ...getCurrentMonthValues(visible),
      ...getNextMonthFillValues(visible)
    ],
    [visible]
  );

  return (
    <div className="chq-cal">
      <div className="chq-cal--head">
        <button
          type="button"
          className="chq-cal--head--prev"
          onClick={onPrevMonthClick}
          aria-label={locales.en.calendar.nav.prev}
        >
          <em className="chq-cal--head--ct" />&nbsp;
        </button>
        <button
          type="button"
          className="chq-cal--head--next"
          onClick={onNextMonthClick}
          aria-label={locales.en.calendar.nav.next}
        >
          <em className="chq-cal--head--ct" />&nbsp;
        </button>
        <div className="chq-cal--head--lbl">
          {locales.en.calendar.monthNames[visible.month]}
          {" "}
          {visible.year}
        </div>
      </div>
      <div className="chq-cal--months">
        {locales.en.calendar.dayAbbrs.map(abbr => (
          <strong key={abbr}>{abbr}</strong>
        ))}
      </div>
      <div className="chq-cal--days">
        {values.map(value => {
          const valueHash = `${value.year}-${value.month}-${value.day}`;
          const onClick = () => onChange(value.year, value.month, value.day);

          const className = classnames("chq-cal--day", {
            "chq-cal--day-act": (valueHash === activeHash),
            "chq-cal--day-out": value.fill
          });

          return (
            <PlainButton key={valueHash} className={className} onClick={onClick}>
              {value.day}
            </PlainButton>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
