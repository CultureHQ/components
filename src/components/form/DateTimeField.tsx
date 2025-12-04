import React from "react";

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
  if (!value) return null;

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

const makeCalendarValue = (
  value: string | undefined,
  offset: number
) => {
  const date = value ? new Date(value) : new Date();
  const offsetDate = new Date(+new Date(date) + offset * 60 * 1000);

  return {
    year: offsetDate.getUTCFullYear(),
    month: offsetDate.getUTCMonth(),
    day: offsetDate.getUTCDate()
  };
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getUTCFullYear() === today.getUTCFullYear()
    && date.getUTCMonth() === today.getUTCMonth()
    && date.getUTCDate() === today.getUTCDate()
  );
};

const makeTimeSelectValue = (
  value: string | undefined,
  offset: number,
  min?: Date | null,
  max?: Date | null
) => {
  if (value) {
    const date = new Date(value);
    const hours = ((date.getUTCHours() + Math.floor(offset / 60)) + 24) % 24;
    const minutes = Math.floor(date.getUTCMinutes() / 15) * 15 + (offset % 60);

    return { hours, minutes };
  }

  const maxIsToday = max && isToday(max);
  const minIsToday = min && isToday(min);

  // Prioritize based on which constraint is today
  if (maxIsToday && max) {
    // Return previous hour from max
    const hours = (max.getUTCHours() + Math.floor(offset / 60) + 24) % 24;
    return { hours, minutes: 0 };
  }

  if (minIsToday && min) {
    // Return next hour from min
    const hours = ((min.getUTCHours() + Math.floor(offset / 60) + 1) + 24) % 24;
    return { hours, minutes: 0 };
  }

  return { hours: 12, minutes: 0 };
};

type DateTimeFieldProps = FormState & {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  name: string;
  offset?: number;
  onChange?: (value: string) => void;
  required?: boolean;
  validator?: (value: string) => FormFieldError;
  value?: string;
  registerModal?: (isOpen: boolean) => void;
  min?: null | Date;
  max?: null | Date;
};

type DateTimeFieldState = {
  open: boolean;
  touched: boolean;
};

class DateTimeField extends React.Component<DateTimeFieldProps, DateTimeFieldState> {
  private buttonRef = React.createRef<HTMLButtonElement>();

  state = { open: false, touched: false };

  componentDidMount() {
    const { autoFocus } = this.props;
    const button = this.buttonRef.current;

    if (autoFocus && button) {
      button.focus();
    }
  }

  componentDidUpdate(prevProps: DateTimeFieldProps) {
    const { disabled, name, onFieldDisabledChange } = this.props;

    if (prevProps.disabled !== disabled) {
      onFieldDisabledChange(name, disabled);
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
    const { min, max } = this.props;
    const offset = this.getOffset();
    const value = this.getValue();

    const date = getDateWithOffset(value ? new Date(value) : new Date(), offset);
    let hours = value ? date.getUTCHours() : (12 - Math.floor(offset / 60));
    let minutes = value ? date.getUTCMinutes() : (0 - (offset % 60));

    // Check if new date equals min date and adjust time if needed
    if (min && year === min.getFullYear() && month === min.getMonth() && day === min.getDate()) {
      const minHours = min.getHours();
      const minMinutes = Math.ceil(min.getMinutes() / 15) * 15;
      const currentTimeInMinutes = hours * 60 + minutes;
      const minTimeInMinutes = minHours * 60 + minMinutes;

      if (currentTimeInMinutes < minTimeInMinutes) {
        hours = Math.floor(minTimeInMinutes / 60);
        minutes = minTimeInMinutes % 60;
        // Handle case where rounding up minutes exceeds 60
        if (minutes >= 60) {
          hours += 1;
          minutes = 0;
        }
      }
    }

    // Check if new date equals max date and adjust time if needed
    if (max && year === max.getFullYear() && month === max.getMonth() && day === max.getDate()) {
      const maxHours = max.getHours();
      const maxMinutes = Math.floor(max.getMinutes() / 15) * 15;
      const currentTimeInMinutes = hours * 60 + minutes;
      const maxTimeInMinutes = maxHours * 60 + maxMinutes;

      if (currentTimeInMinutes > maxTimeInMinutes) {
        hours = Math.floor(maxTimeInMinutes / 60);
        minutes = maxTimeInMinutes % 60;
      }
    }

    const inUTC = new Date([
      year,
      "-",
      padLeft(month + 1),
      "-",
      padLeft(day),
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
    const {
      children, className, disabled, onError, name, required, submitted,
      validator, registerModal, min, max
    } = this.props;

    const { open, touched } = this.state;

    const offset = this.getOffset();
    const value = this.getValue();
    // console.log({ min, max, ...makeTimeSelectValue(value, offset, min, max) });

    return (
      <>
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <PlainButton
            ref={this.buttonRef}
            disabled={disabled}
            aria-label="Open calendar"
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
            registerModal={registerModal}
          >
            <ModalDialog.Heading onClose={this.handleClose}>
              {children}
            </ModalDialog.Heading>
            <ModalDialog.Body>
              <Calendar
                {...makeCalendarValue(value, offset)}
                min={min}
                max={max}
                onChange={this.handleDateChange}
              />
              <TimeSelect
                {...makeTimeSelectValue(value, offset, min, max)}
                min={min}
                max={max}
                dateValue={value}
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
