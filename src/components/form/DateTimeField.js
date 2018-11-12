import React, { Component } from "react";

import classnames from "../../classnames";

import Calendar from "../Calendar";
import Button from "../buttons/Button";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

import DateTimeFieldDisplay from "./DateTimeFieldDisplay";
import FormError from "./FormError";
import TimeSelect from "./TimeSelect";

const normalizeTime = value => {
  if (value) {
    return { hours: value.getHours(), minutes: value.getMinutes() };
  }
  return { hours: 12, minutes: 0 };
};

class DateTimeField extends Component {
  static defaultProps = {
    onChange: () => {},
    onFormChange: () => {}
  };

  state = { open: false, touched: false };

  getNormalValue = () => {
    const { value } = this.props;

    return value ? new Date(value) : null;
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, touched: true });
  };

  handleDateChange = date => {
    this.propagateChange(date, normalizeTime(this.getNormalValue()));
  };

  handleTimeChange = (hours, minutes) => {
    this.propagateChange(this.getNormalValue() || new Date(), { hours, minutes });
    this.handleClose();
  };

  handleSelect = () => {
    const normalValue = this.getNormalValue();

    this.propagateChange(normalValue || new Date(), normalizeTime(normalValue));
    this.handleClose();
  };

  propagateChange = (date, time) => {
    const { name, onChange, onFormChange } = this.props;

    const value = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.hours,
      time.minutes,
      0
    ).toISOString();

    onChange(value);
    onFormChange(name, value);
  };

  render() {
    const {
      children, className, onError, name, required, submitted, value, validator
    } = this.props;

    const { open, touched } = this.state;

    const normalValue = this.getNormalValue();

    return (
      <>
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <PlainButton
            aria-label="Open dialog"
            className="chq-ffd--dt"
            onClick={this.handleOpen}
          >
            <DateTimeFieldDisplay value={normalValue} />
          </PlainButton>
          <input
            id={name}
            name={name}
            type="hidden"
            value={normalValue ? normalValue.toISOString() : ""}
          />
        </label>
        {open && (
          <ModalDialog
            className="chq-ffd--dt--md"
            entrance="zoomIn"
            onClose={this.handleClose}
          >
            <ModalDialog.Heading onClose={this.handleClose}>
              {children}
            </ModalDialog.Heading>
            <ModalDialog.Body>
              <Calendar value={normalValue} onChange={this.handleDateChange} />
              <TimeSelect value={normalValue} onChange={this.handleTimeChange} />
            </ModalDialog.Body>
            <ModalDialog.Footer>
              <Button primary onClick={this.handleSelect}>Select</Button>
            </ModalDialog.Footer>
          </ModalDialog>
        )}
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={value}
        />
      </>
    );
  }
}

export default DateTimeField;
