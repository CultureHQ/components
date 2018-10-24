import React, { Component } from "react";

import classnames from "../../classnames";

import Calendar from "../Calendar";
import PlainButton from "../buttons/PlainButton";
import ModalDialog from "../modals/ModalDialog";

const padLeft = number => `0${number}`.slice(-2);

const DateTimeFieldDisplay = ({ value }) => {
  if (!value) {
    return null;
  }

  const components = [
    value.getFullYear(),
    padLeft(value.getMonth() + 1),
    padLeft(value.getDate())
  ];

  return components.join("-");
};

class DateTimeField extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = value => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }

    this.setState({ open: false });
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
            <ModalDialog.Body>
              <Calendar
                value={value || new Date()}
                onChange={this.handleChange}
              />
            </ModalDialog.Body>
          </ModalDialog>
        )}
      </>
    );
  }
}

export default DateTimeField;
