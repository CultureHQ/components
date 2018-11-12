import React, { Component } from "react";

import classnames from "../../../classnames";
import Badge from "../../buttons/Badge";

const SelectFieldCaret = React.memo(({ open }) => (
  <div className={classnames("chq-ffd--sl--caret", { "chq-ffd--sl--caret-flip": open })} />
));

const SelectFieldSingleValue = ({ display, inputRef, name, onChange, onOpen, open, value }) => (
  <>
    <input type="hidden" id={name} name={name} value={value} />
    <input
      type="text"
      ref={inputRef}
      className="chq-ffd--ctrl"
      onClick={onOpen}
      onChange={onChange}
      value={display}
    />
    <SelectFieldCaret open={open} />
  </>
);

const SelectFieldMultiValueBadge = React.memo(({ value, onDeselect }) => {
  const onClick = event => {
    event.stopPropagation();
    onDeselect(value);
  };

  return <><Badge icon="close" onClick={onClick}>{value}</Badge>{" "}</>;
});

class SelectFieldMultiValue extends Component {
  handleToggleKeyDown = event => {
    const { open, onOpen } = this.props;

    if (!open && event.key === "Enter") {
      onOpen();
    }
  };

  handleInputKeyDown = event => {
    event.stopPropagation();
    const { display, onDeselect, value } = this.props;

    if (!display && event.key === "Backspace" && value) {
      onDeselect(value[value.length - 1]);
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

const SelectFieldValue = ({ multiple, ...props }) => (
  multiple ? <SelectFieldMultiValue {...props} /> : <SelectFieldSingleValue {...props} />
);

export default SelectFieldValue;
