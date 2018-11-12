import React, { Component } from "react";

import SelectFieldCaret from "./SelectFieldCaret";

class SelectFieldSingleValue extends Component {
  handleKeyDown = event => {
    const { onClose, onOpen, open } = this.props;

    switch (event.key) {
      case "Enter":
        if (!open) {
          onOpen();
        }
        break;
      case "Escape":
        if (open) {
          onClose();
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { display, inputRef, name, onChange, onOpen, open, value } = this.props;

    return (
      <>
        <input type="hidden" id={name} name={name} value={value} />
        <input
          type="text"
          ref={inputRef}
          className="chq-ffd--ctrl"
          onClick={onOpen}
          onChange={onChange}
          onKeyDown={this.handleKeyDown}
          value={display}
        />
        <SelectFieldCaret open={open} />
      </>
    );
  }
}

export default SelectFieldSingleValue;
