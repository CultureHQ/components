import React, { Component } from "react";

import TimeSelectOption from "./TimeSelectOption";

const normalizeValue = value => {
  const hours = value ? value.getHours() : 12;
  const minutes = value ? Math.floor(value.getMinutes() / 15) * 15 : 0;

  return `${hours}:${minutes}`;
};

const padLeft = number => `0${number}`.slice(-2);

const TIME_SELECT_OPTIONS = [];

for (let hours = 0; hours < 24; hours += 1) {
  for (let minutes = 0; minutes < 60; minutes += 15) {
    const meridian = hours < 12 ? "AM" : "PM";

    TIME_SELECT_OPTIONS.push({
      label: `${padLeft(hours % 12 || 12)}:${padLeft(minutes)} ${meridian}`,
      value: `${hours}:${minutes}`
    });
  }
}

class TimeSelect extends Component {
  activeOptionRef = React.createRef();

  selectRef = React.createRef();

  componentDidMount() {
    const option = this.activeOptionRef.current;
    const select = this.selectRef.current;

    select.scrollTop = Math.max(0, option.offsetTop - select.offsetTop - 46);
  }

  render() {
    const { value, onChange } = this.props;
    const valueNormal = normalizeValue(value);

    return (
      <div className="chq-tsl" ref={this.selectRef}>
        {TIME_SELECT_OPTIONS.map(option => (
          <TimeSelectOption
            key={option.value}
            option={option}
            value={valueNormal}
            onClick={onChange}
            activeOptionRef={this.activeOptionRef}
          />
        ))}
      </div>
    );
  }
}

export default TimeSelect;
