import React, { Component } from "react";

import classnames from "../../../classnames";
import Badge from "../../buttons/Badge";

const SelectFieldCaret = React.memo(({ open }) => (
  <div className={classnames("chq-ffd--sl--caret", { "chq-ffd--sl--caret-flip": open })} />
));

const SelectFieldSingleValue = ({ display, inputRef, multiple, name, onChange, onDeselect, onOpen, open, value }) => (
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
  handleKeyDown = event => {
    const { display, onDeselect, value } = this.props;

    if (!display && event.key === "Backspace" && value) {
      onDeselect(value[value.length - 1]);
    }
  };

  render() {
    const { display, inputRef, multiple, name, onChange, onDeselect, onOpen, open, value } = this.props;

    return (
      <div role="button" onClick={onOpen} className={classnames("chq-ffd--ctrl", { "chq-ffd--ctrl-fc": open })}>
        <input type="hidden" id={name} name={name} value={value} />
        {value && value.map(item => (
          <SelectFieldMultiValueBadge key={item} value={item} onDeselect={onDeselect} />
        ))}
        <input
          type="text"
          className="chq-ffd--sl--match"
          ref={inputRef}
          onChange={onChange}
          onKeyDown={this.handleKeyDown}
          value={display}
        />
        <SelectFieldCaret open={open} />
      </div>
    );
  }
};

const SelectFieldValue = ({ multiple, ...props }) => (
  multiple ? <SelectFieldMultiValue {...props} /> : <SelectFieldSingleValue {...props} />
);

export default SelectFieldValue;
