import React, { Component } from "react";

import PlainButton from "../buttons/PlainButton";

class CalendarDay extends Component {
  handleClick = () => {
    const { year, month, day, onClick } = this.props;

    onClick(year, month, day);
  };

  render() {
    const { day, className } = this.props;

    return (
      <PlainButton className={className} onClick={this.handleClick}>
        {day}
      </PlainButton>
    );
  }
}

export default CalendarDay;
