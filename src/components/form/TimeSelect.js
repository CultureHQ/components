import React, { useEffect, useRef } from "react";

import classnames from "../../classnames";
import PlainButton from "../buttons/PlainButton";

const padLeft = number => `0${number}`.slice(-2);

const TIME_SELECT_OPTIONS = [];

for (let hours = 0; hours < 24; hours += 1) {
  for (let minutes = 0; minutes < 60; minutes += 15) {
    const meridian = hours < 12 ? "AM" : "PM";

    TIME_SELECT_OPTIONS.push({
      hours,
      minutes,
      label: `${padLeft(hours % 12 || 12)}:${padLeft(minutes)} ${meridian}`
    });
  }
}

const TimeSelectOption = ({ activeOptionRef, hours, minutes, onChange, option }) => {
  const isActive = hours === option.hours && minutes === option.minutes;

  return (
    <PlainButton
      ref={isActive ? activeOptionRef : null}
      className={classnames("chq-tsl--op", { "chq-tsl--op-act": isActive })}
      onClick={() => onChange(option.hours, option.minutes)}
    >
      {option.label}
    </PlainButton>
  );
};

const TimeSelect = ({ hours, minutes, onChange }) => {
  const activeOptionRef = useRef();
  const selectRef = useRef();

  useEffect(
    () => {
      const activeOption = activeOptionRef.current;
      const select = selectRef.current;

      if (activeOption && select) {
        select.scrollTop = Math.max(0, activeOption.offsetTop - select.offsetTop - 46);
      }
    },
    [activeOptionRef, selectRef]
  );

  return (
    <div className="chq-tsl" ref={selectRef}>
      {TIME_SELECT_OPTIONS.map(option => (
        <TimeSelectOption
          key={`${option.hours}:${option.minutes}`}
          activeOptionRef={activeOptionRef}
          hours={hours}
          minutes={minutes}
          onChange={onChange}
          option={option}
        />
      ))}
    </div>
  );
};

export default TimeSelect;
