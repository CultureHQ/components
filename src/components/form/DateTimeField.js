import React, { Component } from "react";

import classnames from "../../classnames";

import Calendar from "../Calendar";
import Button from "../buttons/Button";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

import DateTimeFieldDisplay from "./DateTimeFieldDisplay";
import TimeSelect from "./TimeSelect";

const normalizeTime = value => {
  if (value) {
    return { hours: value.getHours(), minutes: value.getMinutes() };
  }
  return { hours: 12, minutes: 0 };
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

    this.propagateChange(date, normalizeTime(value));
  };

  handleTimeChange = (hours, minutes) => {
    const { value } = this.props;

    this.propagateChange(value || new Date(), { hours, minutes });
    this.setState({ open: false });
  };

  handleSelect = () => {
    const { value } = this.props;

    this.propagateChange(value || new Date(), normalizeTime(value));
    this.setState({ open: false });
  };

  propagateChange = (date, time) => {
    const { name, onChange, onFormChange } = this.props;
    const value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes, 0);

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
          <ModalDialog className="chq-ffd--dt--md" entrance="zoomIn" onClose={this.handleClose}>
            <ModalDialog.Heading onClose={this.handleClose}>
              {children}
            </ModalDialog.Heading>
            <ModalDialog.Body>
              <Calendar value={value} onChange={this.handleDateChange} />
              <TimeSelect value={value} onChange={this.handleTimeChange} />
            </ModalDialog.Body>
            <ModalDialog.Footer>
              <Button primary onClick={this.handleSelect}>Select</Button>
            </ModalDialog.Footer>
          </ModalDialog>
        )}
      </>
    );
  }
}

export default DateTimeField;
