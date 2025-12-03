import React, { useEffect, useRef } from "react";

import PlainButton from "../buttons/PlainButton";
import classnames from "../../classnames";

type TimeSelectOption = {
  hours: number;
  minutes: number;
  label: string;
};

const padLeft = (value: number) => `0${value}`.slice(-2);
const timeSelectOptions: TimeSelectOption[] = [];

for (let hours = 0; hours < 24; hours += 1) {
  for (let minutes = 0; minutes < 60; minutes += 15) {
    const meridian = hours < 12 ? "AM" : "PM";

    timeSelectOptions.push({
      hours,
      minutes,
      label: `${padLeft(hours % 12 || 12)}:${padLeft(minutes)} ${meridian}`
    });
  }
}

type TimeSelectOnChange = (hours: number, minutes: number) => void;

type TimeSelectButtonProps = {
  currentOptionRef: React.RefObject<HTMLButtonElement>;
  hours: number;
  minutes: number;
  onChange: TimeSelectOnChange;
  option: TimeSelectOption;
  min?: Date | null | undefined;
  max?: Date | null | undefined;
  dateValue?: string
};

const TimeSelectButton: React.FC<TimeSelectButtonProps> = ({
  currentOptionRef,
  hours,
  minutes,
  onChange,
  option,
  min,
  max,
  dateValue
}) => {
  const current = hours === option.hours && minutes === option.minutes;

  const isInRange = () => {
    if (!min || !max || !dateValue) return true;
    const selectedDate = new Date(dateValue);

    // is the min date
    if (selectedDate.getDate() === min.getDate() && selectedDate.getMonth() === min.getMonth()) {
      const optionDate = new Date(
        min.getFullYear(),
        min.getMonth(),
        min.getDate(),
        option.hours,
        option.minutes
      );
      return optionDate.getTime() >= min.getTime();
    }

    // is the max date
    if (selectedDate.getDate() === max.getDate() && selectedDate.getMonth() === max.getMonth()) {
      const optionDate = new Date(
        max.getFullYear(),
        max.getMonth(),
        max.getDate(),
        option.hours,
        option.minutes
      );
      return optionDate.getTime() <= max.getTime();
    }

    return true;
  };

  const inRange = isInRange();

  const className = classnames("chq-tsl--op", {
    "chq-tsl--op-out": !inRange
  });

  return (
    <PlainButton
      aria-current={current}
      className={className}
      onClick={inRange ? () => onChange(option.hours, option.minutes) : () => {}}
      ref={current ? currentOptionRef : null}
    >
      {option.label}
    </PlainButton>
  );
};

type TimeSelectProps = {
  hours: number;
  minutes: number;
  onChange: TimeSelectOnChange;
  dateValue?: string;
  min?: Date | null | undefined;
  max?: Date | null | undefined;
};

const TimeSelect: React.FC<TimeSelectProps> = (
  { hours, minutes, onChange, dateValue, min, max }) => {
  const currentOptionRef = useRef<HTMLButtonElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const currentOption = currentOptionRef.current;
      const select = selectRef.current;

      if (currentOption && select) {
        select.scrollTop = Math.max(0, currentOption.offsetTop - select.offsetTop - 46);
      }
    },
    [currentOptionRef, selectRef]
  );

  return (
    <div className="chq-tsl" ref={selectRef}>
      {timeSelectOptions.map(option => (
        <TimeSelectButton
          key={`${option.hours}:${option.minutes}`}
          currentOptionRef={currentOptionRef}
          hours={hours}
          minutes={minutes}
          onChange={onChange}
          option={option}
          max={max}
          min={min}
          dateValue={dateValue}
        />
      ))}
    </div>
  );
};

export default TimeSelect;
