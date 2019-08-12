import React, { Component } from "react";

import classnames from "../../classnames";
import locales from "../../locales";

import Calendar from "../Calendar";
import Button from "../buttons/Button";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

import FormError from "./FormError";
import TimeSelect from "./TimeSelect";
import { withForm } from "./Form";

const padLeft = number => `0${number}`.slice(-2);

const getDateWithOffset = (value, offset) => (
  new Date(+new Date(value) + offset * 60 * 1000)
);

const makeDateTime = (value, offset) => {
  if (!value) {
    return null;
  }

  const date = getDateWithOffset(value, offset);
  const components = [
    locales.en.calendar.monthNames[date.getUTCMonth()],
    " ",
    date.getUTCDate(),
    ", ",
    date.getUTCFullYear(),
    " ",
    date.getUTCHours() % 12 || 12,
    ":",
    padLeft(date.getUTCMinutes()),
    " ",
    date.getUTCHours() < 12 ? "AM" : "PM"
  ];

  return components.join("");
};

const makeCalendarValue = (value, offset) => {
  const date = value ? new Date(value) : new Date();
  const offsetDate = new Date(+new Date(date) + offset * 60 * 1000);

  return {
    year: offsetDate.getUTCFullYear(),
    month: offsetDate.getUTCMonth(),
    day: offsetDate.getUTCDate()
  };
};

const makeTimeSelectValue = (value, offset) => {
  if (!value) {
    return { hours: 12, minutes: 0 };
  }

  const date = new Date(value);
  const hours = ((date.getUTCHours() + Math.floor(offset / 60)) + 24) % 24;
  const minutes = Math.floor(date.getUTCMinutes() / 15) * 15 + (offset % 60);

  return { hours, minutes };
};

class DateTimeField extends Component {
  state = { open: false, touched: false };

  getValue = () => {
    const { name, value, values } = this.props;

    return value || values[name];
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, touched: true });
  };

  handleDateChange = (year, month, day) => {
    const { offset } = this.props;

    const value = this.getValue();

    const date = getDateWithOffset(value ? new Date(value) : new Date(), offset);
    const inUTC = new Date([
      year,
      "-",
      padLeft(month + 1),
      "-",
      padLeft(day),
      "T",
      padLeft(value ? date.getUTCHours() : (12 - Math.floor(offset / 60))),
      ":",
      padLeft(value ? date.getUTCMinutes() : (0 - (offset % 60))),
      ":00",
      offset < 0 ? "-" : "+",
      padLeft(Math.abs(Math.floor(offset / 60))),
      ":",
      padLeft(Math.abs(offset % 60))
    ].join(""));

    this.propagateChange(
      inUTC.getUTCFullYear(),
      inUTC.getUTCMonth(),
      inUTC.getUTCDate(),
      inUTC.getUTCHours(),
      inUTC.getUTCMinutes()
    );
  };

  handleTimeChange = (hours, minutes) => {
    const { offset } = this.props;

    const value = this.getValue();
    const date = getDateWithOffset(value ? new Date(value) : new Date(), offset);

    const inUTC = new Date([
      date.getFullYear(),
      "-",
      padLeft(date.getUTCMonth() + 1),
      "-",
      padLeft(date.getUTCDate()),
      "T",
      padLeft(hours),
      ":",
      padLeft(minutes),
      ":00",
      offset < 0 ? "-" : "+",
      padLeft(Math.abs(Math.floor(offset / 60))),
      ":",
      padLeft(Math.abs(offset % 60))
    ].join(""));

    this.propagateChange(
      inUTC.getUTCFullYear(),
      inUTC.getUTCMonth(),
      inUTC.getUTCDate(),
      inUTC.getUTCHours(),
      inUTC.getUTCMinutes()
    );
    this.handleClose();
  };

  handleSelect = () => {
    const { offset } = this.props;

    const value = this.getValue();
    const date = value ? new Date(value) : new Date();

    this.propagateChange(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      value ? date.getUTCHours() : (12 - Math.floor(offset / 60)),
      value ? date.getUTCMinutes() : (0 - (offset % 60))
    );
    this.handleClose();
  };

  propagateChange = (year, month, date, hours, minutes) => {
    const { name, onChange, onFormChange } = this.props;
    const value = new Date(Date.UTC(year, month, date, hours, minutes, 0)).toISOString();

    onChange(value);
    onFormChange(name, value);
  };

  render() {
    const {
      children, className, onError, name, offset, required, submitted, validator
    } = this.props;

    const { open, touched } = this.state;

    const value = this.getValue();

    return (
      <>
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <PlainButton
            aria-label="Open dialog"
            className="chq-ffd--ctrl chq-ffd--dt"
            onClick={this.handleOpen}
          >
            {makeDateTime(value, offset)}
          </PlainButton>
          <input
            aria-label={name}
            id={name}
            name={name}
            type="hidden"
            value={value || ""}
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
              <Calendar
                {...makeCalendarValue(value, offset)}
                onChange={this.handleDateChange}
              />
              <TimeSelect
                {...makeTimeSelectValue(value, offset)}
                onChange={this.handleTimeChange}
              />
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

DateTimeField.defaultProps = {
  offset: -new Date().getTimezoneOffset(),
  onChange: () => {},
  onFormChange: () => {},
  values: {}
};

export default withForm(DateTimeField);
