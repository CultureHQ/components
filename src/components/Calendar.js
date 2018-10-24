import React, { Component } from "react";

import classnames from "../classnames";
import locales from "../locales";

import CalendarDays from "./calendar/CalendarDays";

const getStartOfMonth = date => new Date(date.getFullYear(), date.getMonth(), 1);

const hashMonth = date => `${date.getFullYear()}-${date.getMonth() + 1}`;

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = { visibleValue: getStartOfMonth(props.value) };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    const { visibleValue } = this.state;

    if (prevProps.value !== value && hashMonth(value) !== hashMonth(visibleValue)) {
      this.setState({ visibleValue: getStartOfMonth(value) });
    }
  }

  handlePrevMonthClick = () => {
    this.setState(({ visibleValue }) => {
      const nextVisibleValue = new Date(visibleValue);
      nextVisibleValue.setMonth(nextVisibleValue.getMonth() - 1);

      return { visibleValue: nextVisibleValue };
    });
  };

  handleNextMonthClick = () => {
    this.setState(({ visibleValue }) => {
      const nextVisibleValue = new Date(visibleValue);
      nextVisibleValue.setMonth(nextVisibleValue.getMonth() + 1);

      return { visibleValue: nextVisibleValue };
    });
  };

  render() {
    const { onChange, value } = this.props;
    const { visibleValue } = this.state;

    return (
      <div className="chq-cal">
        <div className="chq-cal--head">
          <button
            type="button"
            className="chq-cal--head--prev"
            onClick={this.handlePrevMonthClick}
          >
            <em className="chq-cal--head--ct" />&nbsp;
          </button>
          <button
            type="button"
            className="chq-cal--head--next"
            onClick={this.handleNextMonthClick}
          >
            <em className="chq-cal--head--ct" />&nbsp;
          </button>
          <div className="chq-cal--head--lbl">
            {locales.en.monthNames[visibleValue.getMonth()]}
            {" "}
            {visibleValue.getFullYear()}
          </div>
        </div>
        <div className="chq-cal--months">
          {locales.en.dayAbbrs.map(abbr => (
            <strong key={abbr}>{abbr}</strong>
          ))}
        </div>
        <div className="chq-cal--days">
          <CalendarDays
            value={value}
            visibleValue={visibleValue}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
