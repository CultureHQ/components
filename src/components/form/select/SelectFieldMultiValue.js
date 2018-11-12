import React, { Component } from "react";

import classnames from "../../../classnames";
import Badge from "../../buttons/Badge";
import SelectFieldCaret from "./SelectFieldCaret";

const SelectFieldMultiValueBadge = ({ value, onDeselect }) => {
  const onClick = event => {
    event.stopPropagation();
    onDeselect(value);
  };

  return <><Badge icon="close" onClick={onClick}>{value}</Badge>{" "}</>;
};

class SelectFieldMultiValue extends Component {
  handleToggleKeyDown = event => {
    const { open, onOpen } = this.props;

    if (!open && event.key === "Enter") {
      onOpen();
    }
  };

  handleInputKeyDown = event => {
    event.stopPropagation();
    const { display, onClose, onDeselect, value } = this.props;

    switch (event.key) {
      case "Backspace":
        if (!display && value) {
          onDeselect(value[value.length - 1]);
        }
        break;
      case "Escape":
        onClose();
        break;
      default:
        break;
    }
  };

  render() {
    const { display, inputRef, name, onChange, onDeselect, onOpen, open, value } = this.props;
    const className = classnames("chq-ffd--ctrl", { "chq-ffd--ctrl-fc": open });

    return (
      <div role="button" tabIndex={0} onClick={onOpen} onKeyDown={this.handleToggleKeyDown} className={className}>
        <input type="hidden" id={name} name={name} value={value} />
        {value && value.map(item => (
          <SelectFieldMultiValueBadge key={item} value={item} onDeselect={onDeselect} />
        ))}
        <input
          type="text"
          className="chq-ffd--sl--match"
          ref={inputRef}
          onChange={onChange}
          onKeyDown={this.handleInputKeyDown}
          value={display}
        />
        <SelectFieldCaret open={open} />
      </div>
    );
  }
}

export default SelectFieldMultiValue;
