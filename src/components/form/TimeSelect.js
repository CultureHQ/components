import React, { Component } from "react";

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

class TimeSelect extends Component {
  activeOptionRef = React.createRef();

  selectRef = React.createRef();

  componentDidMount() {
    const option = this.activeOptionRef.current;
    const select = this.selectRef.current;

    if (option && select) {
      select.scrollTop = Math.max(0, option.offsetTop - select.offsetTop - 46);
    }
  }

  render() {
    const { hours, minutes, onChange } = this.props;

    return (
      <div className="chq-tsl" ref={this.selectRef}>
        {TIME_SELECT_OPTIONS.map(option => {
          const isActive = hours === option.hours && minutes === option.minutes;

          return (
            <PlainButton
              key={`${option.hours}:${option.minutes}`}
              ref={isActive ? this.activeOptionRef : null}
              className={classnames("chq-tsl--op", { "chq-tsl--op-act": isActive })}
              onClick={() => onChange(option.hours, option.minutes)}
            >
              {option.label}
            </PlainButton>
          );
        })}
      </div>
    );
  }
}

export default TimeSelect;
