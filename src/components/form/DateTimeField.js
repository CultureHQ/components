import React, { Component } from "react";

import classnames from "../../classnames";

import Calendar from "../Calendar";
import Button from "../buttons/Button";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

import FormError from "./FormError";
import TimeSelect from "./TimeSelect";
import { withForm } from "./Form";

const normalizeTime = value => {
  if (value) {
    return { hours: value.getHours(), minutes: value.getMinutes() };
  }
  return { hours: 12, minutes: 0 };
};

const padLeft = number => `0${number}`.slice(-2);

const makeDateTimeString = (value, timezoneOffset) => {
  const offset = new Date().getTimezoneOffset() - timezoneOffset;
  const date = new Date(+value + (offset * 60 * 1000));

  const components = [
    date.getFullYear(),
    "-",
    padLeft(date.getMonth() + 1),
    "-",
    padLeft(date.getDate()),
    " ",
    date.getHours() % 12 || 12,
    ":",
    padLeft(date.getMinutes()),
    " ",
    date.getHours() < 12 ? "AM" : "PM"
  ];

  return components.join("");
};

class DateTimeField extends Component {
  static defaultProps = {
    onChange: () => {},
    onFormChange: () => {},
    timezoneOffset: new Date().getTimezoneOffset(),
    values: {}
  };

  state = { open: false, touched: false };

  getDate = () => {
    const { name, value, values } = this.props;
    const normal = value || values[name];

    return normal ? new Date(normal) : null;
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, touched: true });
  };

  handleDateChange = date => {
    this.propagateChange(date, normalizeTime(this.getDate()));
  };

  handleTimeChange = (hours, minutes) => {
    this.propagateChange(this.getDate() || new Date(), { hours, minutes });
    this.handleClose();
  };

  handleSelect = () => {
    const normalValue = this.getDate();

    this.propagateChange(normalValue || new Date(), normalizeTime(normalValue));
    this.handleClose();
  };

  propagateChange = (date, time) => {
    const { name, timezoneOffset, onChange, onFormChange } = this.props;

    let value = +new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.hours,
      time.minutes,
      0
    );

    value += (timezoneOffset - new Date().getTimezoneOffset()) * 60 * 1000;
    value = new Date(value).toISOString();

    onChange(value);
    onFormChange(name, value);
  };

  render() {
    const {
      children, className, name, required, submitted, timezoneOffset, validator
    } = this.props;

    const { open, touched } = this.state;

    const currentDate = this.getDate();

    return (
      <>
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <PlainButton
            aria-label="Open dialog"
            className="chq-ffd--ctrl chq-ffd--dt"
            onClick={this.handleOpen}
          >
            {currentDate && makeDateTimeString(currentDate, timezoneOffset)}
          </PlainButton>
          <input
            id={name}
            name={name}
            type="hidden"
            value={currentDate ? currentDate.toISOString() : ""}
          />
        </label>
        {open && (
          <ModalDialog
            className="chq-ffd--dtmd"
            entrance="zoomIn"
            onClose={this.handleClose}
          >
            <ModalDialog.Heading onClose={this.handleClose}>
              {children}
            </ModalDialog.Heading>
            <ModalDialog.Body>
              <Calendar value={currentDate} onChange={this.handleDateChange} />
              <TimeSelect value={currentDate} onChange={this.handleTimeChange} />
            </ModalDialog.Body>
            <ModalDialog.Footer>
              <Button primary onClick={this.handleSelect}>Select</Button>
            </ModalDialog.Footer>
          </ModalDialog>
        )}
        <FormError
          name={name}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={currentDate}
        />
      </>
    );
  }
}

export default withForm(DateTimeField);
