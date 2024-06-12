import React, { useEffect, useMemo, useState } from "react";

import classnames from "../classnames";
import * as locales from "../locales.json";

import PlainButton from "./buttons/PlainButton";

type CalendarView = {
  year: number;
  month: number;
};

const getPrevMonthFillValues = (visible: CalendarView) => {
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

const getCurrentMonthValues = (visible: CalendarView) => {
  const maxDay = new Date(visible.year, visible.month + 1, 0).getDate();
  const values = [];

  for (let day = 1; day <= maxDay; day += 1) {
    values.push({ year: visible.year, month: visible.month, day, fill: false });
  }

  return values;
};

const getNextMonthFillValues = (visible: CalendarView) => {
  const lastDayOfWeek = new Date(visible.year, visible.month + 1, 0).getDay();
  const values = [];

  const nextYear = visible.year + (visible.month === 11 ? 1 : 0);
  const nextMonth = (visible.month + 1) % 12;

  for (let idx = lastDayOfWeek; idx < 6; idx += 1) {
    values.push({ year: nextYear, month: nextMonth, day: idx - lastDayOfWeek + 1, fill: true });
  }

  return values;
};

const makeActiveHash = (year: null | number, month: null | number, day: null | number) => {
  if (year !== null && month !== null && day !== null) {
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

type CalendarProps = {
  year?: null | number;
  month?: null | number;
  day?: null | number;
  year2?: null | number;
  month2?: null | number;
  day2?: null | number;
  range?: boolean;
  onChange: (year: number, month: number, day: number, range: boolean) => void;
};

const Calendar: React.FC<CalendarProps> = ({ year = null, month = null, day = null,
  onChange, range = false, year2, month2, day2 }) => {
  const [visible, setVisible] = useState<CalendarView>(() => ({
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
  const activeHash2 = year2 && day2 ? makeActiveHash(year2, month2 || 0, day2) : undefined;
  const values = useMemo(
    () => [
      ...getPrevMonthFillValues(visible),
      ...getCurrentMonthValues(visible),
      ...getNextMonthFillValues(visible)
    ],
    [visible]
  );

  const startDate = () => {
    // true: first date false: second date
    const firstDate = new Date(year || 0, month || 0, day || 0);
    const secondDate = new Date(year2 || 0, month2 || 0, day2 || 0);
    return firstDate < secondDate;
  };

  const isInRange = (dYear: number, dMonth: number, dDay: number) => {
    if (range) {
      if (year === null || year2 === null
        || month === null || month2 === null
        || day === null || day2 === null
      ) {
        return false;
      }
      const currentDay = new Date(dYear, dMonth, dDay);
      const firstDay = new Date(year, month, day);
      const secondDay = new Date(year2 || 0, month2 || 0, day2 || 0);

      if (startDate()) {
        return currentDay > firstDay && currentDay < secondDay;
      }
      return currentDay > secondDay && currentDay < firstDay;
    }
    return false;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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
        {locales.en.calendar.dayAbbrs.map((abbr: string) => (
          <strong key={abbr}>{abbr}</strong>
        ))}
      </div>
      <div className="chq-cal--days">
        {values.map(value => {
          const valueHash = `${value.year}-${value.month}-${value.day}`;
          const onClick = () => onChange(value.year, value.month, value.day, range);
          const inRange = isInRange(value.year, value.month, value.day);
          const className = classnames("chq-cal--day", {
            "chq-cal--day-act": (valueHash === activeHash || valueHash === activeHash2),
            "chq-cal--day-out": value.fill,
            "chq-cal--day-in-range": inRange
          });

          return (
            <>
              <div id={`${value.month}-${value.day}-${value.year}`} style={{ display: "none" }}>{monthNames[value.month]} {value.day}, {value.year}</div>
              <PlainButton key={valueHash} className={className} onClick={onClick} aria-labelledby={`${value.month}-${value.day}-${value.year}`}>
                {value.day}
              </PlainButton>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
