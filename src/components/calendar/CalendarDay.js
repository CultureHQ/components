import React, { Component } from "react";

import PlainButton from "../buttons/PlainButton";

class CalendarDay extends Component {
  handleClick = () => {
    const { day, onClick } = this.props;

    onClick(day);
  };

  render() {
    const { day, className } = this.props;

    return (
      <PlainButton className={className} onClick={this.handleClick}>
        {day.getUTCDate()}
      </PlainButton>
    );
  }
}

export default CalendarDay;
