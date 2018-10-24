import React, { Component } from "react";

import classnames from "../../classnames";

import Calendar from "../Calendar";
import ModalDialog from "../modals/ModalDialog";
import PlainButton from "../buttons/PlainButton";
import TimeSelect from "./TimeSelect";

const padLeft = number => `0${number}`.slice(-2);

const DateTimeFieldDisplay = ({ value }) => {
  if (!value) {
    return null;
  }

  const components = [
    value.getFullYear(),
    "-",
    padLeft(value.getMonth() + 1),
    "-",
    padLeft(value.getDate()),
    " ",
    value.getHours() % 12 || 12,
    ":",
    padLeft(value.getMinutes()),
    " ",
    value.getHours() < 12 ? "AM" : "PM"
  ];

  return components.join("");
};

class DateTimeField extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateChange = date => {
    const { value } = this.props;

    this.propagateChange(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      value ? value.getHours() : 12,
      value ? value.getMinutes() : 0
    );
  };

  handleTimeChange = (hours, minutes) => {
    const { value } = this.props;
    const valueNormal = value || new Date();

    this.propagateChange(
      valueNormal.getFullYear(),
      valueNormal.getMonth(),
      valueNormal.getDate(),
      hours,
      minutes
    );

    this.setState({ open: false });
  };

  propagateChange = (year, month, date, hours, minutes) => {
    const value = new Date(year, month, date, hours, minutes, 0);
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }
  };

  render() {
    const { children, className, onChange, onFormChange, onError, name, required, submitted, value } = this.props;
    const { open } = this.state;

    return (
      <>
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <PlainButton aria-label="Open dialog" className="chq-ffd--dt" onClick={this.handleOpen}>
            <DateTimeFieldDisplay value={value} />
          </PlainButton>
        </label>
        {open && (
          <ModalDialog entrance="zoomIn" onClose={this.handleClose}>
            <ModalDialog.Heading onClose={this.handleClose}>
              {children}
            </ModalDialog.Heading>
            <ModalDialog.Body>
              <Calendar
                value={value || new Date()}
                onChange={this.handleDateChange}
              />
              <TimeSelect
                value={value}
                onChange={this.handleTimeChange}
              />
            </ModalDialog.Body>
          </ModalDialog>
        )}
      </>
    );
  }
}

export default DateTimeField;
