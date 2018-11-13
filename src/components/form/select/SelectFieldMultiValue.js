import React, { Component, Fragment } from "react";

import classnames from "../../../classnames";
import Badge from "../../buttons/Badge";
import SelectFieldCaret from "./SelectFieldCaret";

const SelectFieldMultiValueBadge = ({ option, onDeselect }) => {
  const { label, value } = option;

  const onClick = event => {
    event.stopPropagation();
    onDeselect(value);
  };

  return <><Badge icon="close" onClick={onClick}>{label}</Badge>{" "}</>;
};

class SelectFieldMultiValue extends Component {
  getCurrentOptions() {
    const { options, value } = this.props;

    if (!value) {
      return [];
    }

    return value.map(item => (
      options.find(option => option.value === item) // given option
      || { label: item, value: item } // created option
    ));
  }

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
    const currentOptions = this.getCurrentOptions();

    return (
      <div role="button" tabIndex={0} onClick={onOpen} onKeyDown={this.handleToggleKeyDown} className={className}>
        {currentOptions.map((option, index) => (
          <Fragment key={option.value}>
            <input type="hidden" id={`${name}[${index}]`} name={`${name}[]`} value={option.value} />
            <SelectFieldMultiValueBadge option={option} onDeselect={onDeselect} />
          </Fragment>
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
