import React, { Component } from "react";

import classnames from "../../classnames";

import Calendar from "../Calendar";
import Button from "../buttons/Button";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

import FormError from "./FormError";
import TimeSelect from "./TimeSelect";
import { withForm } from "./Form";

const padLeft = number => `0${number}`.slice(-2);

const makeDateTime = (value, offset) => {
  if (!value) {
    return null;
  }

  const date = new Date(+new Date(value) + offset * 60 * 1000);
  const components = [
    date.getUTCFullYear(),
    "-",
    padLeft(date.getUTCMonth() + 1),
    "-",
    padLeft(date.getUTCDate()),
    " ",
    date.getUTCHours() % 12 || 12,
    ":",
    padLeft(date.getUTCMinutes()),
    " ",
    date.getUTCHours() < 12 ? "AM" : "PM"
  ];

  return components.join("");
};

const makeTimeSelectValue = (value, offset) => {
  const date = value ? new Date(value) : null;

  const hours = date ? (date.getUTCHours() + Math.floor(offset / 60)) : 12;
  const minutes = date ? (Math.floor(date.getUTCMinutes() / 15) * 15 + (offset % 60)) : 0;

  return `${hours}:${minutes}`;
};

class DateTimeField extends Component {
  static defaultProps = {
    offset: -new Date().getTimezoneOffset(),
    onChange: () => {},
    onFormChange: () => {},
    values: {}
  };

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

  handleDateChange = newDate => {
    const { offset } = this.props;

    const value = this.getValue();
    const date = value ? new Date(value) : new Date();

    this.propagateChange(Date.UTC(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth(),
      newDate.getUTCDate(),
      value ? date.getUTCHours() : (12 - Math.floor(offset / 60)),
      value ? date.getUTCMinutes() : (0 - (offset % 60)),
      0
    ));
  };

  handleTimeChange = (hours, minutes) => {
    const { offset } = this.props;

    const value = this.getValue();
    const date = value ? new Date(value) : new Date();

    this.propagateChange(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      hours - Math.floor(offset / 60),
      minutes - (offset % 60),
      0
    ));
    this.handleClose();
  };

  handleSelect = () => {
    const { offset } = this.props;

    const value = this.getValue();
    const date = value ? new Date(value) : new Date();

    this.propagateChange(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      value ? date.getUTCHours() : (12 - Math.floor(offset / 60)),
      value ? date.getUTCMinutes() : (0 - (offset % 60)),
      0
    ));
    this.handleClose();
  };

  propagateChange = timestamp => {
    const { name, onChange, onFormChange } = this.props;
    const value = new Date(timestamp).toISOString();

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
                value={value ? new Date(value) : new Date()}
                onChange={this.handleDateChange}
              />
              <TimeSelect
                value={makeTimeSelectValue(value, offset)}
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

export default withForm(DateTimeField);
