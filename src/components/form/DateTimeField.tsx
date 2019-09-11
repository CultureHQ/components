import * as React from "react";

import classnames from "../../classnames";
import locales from "../../locales.json";

import Calendar from "../Calendar";
import Button from "../buttons/Button";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

import FormError from "./FormError";
import TimeSelect from "./TimeSelect";
import { FormState, withForm } from "./Form";
import { FormFieldError } from "./typings";

const padLeft = (number: number) => `0${number}`.slice(-2);

const getDateWithOffset = (value: Date | string, offset: number) => (
  new Date(+new Date(value) + offset * 60 * 1000)
);

const makeDateTime = (value: string | undefined, offset: number) => {
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

const makeCalendarValue = (value: string | undefined, offset: number) => {
  const date = value ? new Date(value) : new Date();
  const offsetDate = new Date(+new Date(date) + offset * 60 * 1000);

  return {
    year: offsetDate.getUTCFullYear(),
    month: offsetDate.getUTCMonth(),
    day: offsetDate.getUTCDate()
  };
};

const makeTimeSelectValue = (value: string | undefined, offset: number) => {
  if (!value) {
    return { hours: 12, minutes: 0 };
  }

  const date = new Date(value);
  const hours = ((date.getUTCHours() + Math.floor(offset / 60)) + 24) % 24;
  const minutes = Math.floor(date.getUTCMinutes() / 15) * 15 + (offset % 60);

  return { hours, minutes };
};

type DateTimeFieldProps = {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  name: string;
  offset?: number;
  onChange?: (value: string) => void;
  required?: boolean;
  validator?: (value: string) => FormFieldError;
  value?: string;
};

type DateTimeFieldState = {
  open: boolean;
  touched: boolean;
};

class DateTimeField extends React.Component<DateTimeFieldProps & FormState, DateTimeFieldState> {
  private buttonRef = React.createRef<HTMLButtonElement>();

  state = { open: false, touched: false };

  componentDidMount() {
    const { autoFocus } = this.props;
    const button = this.buttonRef.current;

    if (autoFocus && button) {
      button.focus();
    }
  }

  getOffset = () => {
    const { offset = -new Date().getTimezoneOffset() } = this.props;

    return offset;
  };

  getValue = () => {
    const { name, value, values } = this.props;

    return value || (values[name] as undefined | string);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, touched: true });
  };

  handleDateChange = (year: number, month: number, day: number) => {
    const offset = this.getOffset();
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

  handleTimeChange = (hours: number, minutes: number) => {
    const offset = this.getOffset();
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
    const offset = this.getOffset();
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

  propagateChange = (year: number, month: number, date: number, hours: number, minutes: number) => {
    const { name, onChange, onFormChange } = this.props;
    const value = new Date(Date.UTC(year, month, date, hours, minutes, 0)).toISOString();

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  render() {
    const { children, className, onError, name, required, submitted, validator } = this.props;
    const { open, touched } = this.state;

    const offset = this.getOffset();
    const value = this.getValue();

    return (
      <>
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <PlainButton
            ref={this.buttonRef}
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

export default withForm(DateTimeField);
