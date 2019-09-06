import * as React from "react";

import classnames from "../../classnames";
import PlainButton from "../buttons/PlainButton";

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
  activeOptionRef: React.RefObject<HTMLButtonElement>;
  hours: number;
  minutes: number;
  onChange: TimeSelectOnChange;
  option: TimeSelectOption;
};

const TimeSelectButton = ({ activeOptionRef, hours, minutes, onChange, option }: TimeSelectButtonProps) => {
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

type TimeSelectProps = {
  hours: number;
  minutes: number;
  onChange: TimeSelectOnChange;
};

const TimeSelect = ({ hours, minutes, onChange }: TimeSelectProps) => {
  const activeOptionRef = React.useRef<HTMLButtonElement>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(
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
      {timeSelectOptions.map(option => (
        <TimeSelectButton
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
