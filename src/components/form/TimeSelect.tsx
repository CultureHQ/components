import * as React from "react";

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
  currentOptionRef: React.RefObject<HTMLButtonElement>;
  hours: number;
  minutes: number;
  onChange: TimeSelectOnChange;
  option: TimeSelectOption;
};

const TimeSelectButton: React.FC<TimeSelectButtonProps> = ({
  currentOptionRef,
  hours,
  minutes,
  onChange,
  option
}) => {
  const current = hours === option.hours && minutes === option.minutes;

  return (
    <PlainButton
      aria-current={current}
      className="chq-tsl--op"
      onClick={() => onChange(option.hours, option.minutes)}
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
};

const TimeSelect: React.FC<TimeSelectProps> = ({ hours, minutes, onChange }) => {
  const currentOptionRef = React.useRef<HTMLButtonElement>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(
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
        />
      ))}
    </div>
  );
};

export default TimeSelect;
