import React, { Component } from "react";

import classnames from "../../classnames";

import Calendar from "../Calendar";
import Button from "../buttons/Button";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

import DateTimeFieldDisplay from "./DateTimeFieldDisplay";
import FormError from "./FormError";
import TimeSelect from "./TimeSelect";
import { withForm } from "./Form";

const normalizeTime = value => {
  if (value) {
    return { hours: value.getHours(), minutes: value.getMinutes() };
  }
  return { hours: 12, minutes: 0 };
};

class DateTimeField extends Component {
  static defaultProps = {
    onChange: () => {},
    onFormChange: () => {},
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
    const normal = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    this.propagateChange(normal, normalizeTime(this.getDate()));
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
      children, className, onError, name, required, submitted, value, values,
      validator
    } = this.props;

    const { open, touched } = this.state;

    const normal = value || values[name];
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
            <DateTimeFieldDisplay value={currentDate} />
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
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={normal}
        />
      </>
    );
  }
}

export default withForm(DateTimeField);
