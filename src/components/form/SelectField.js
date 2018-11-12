import React, { Component } from "react";

import classnames from "../../classnames";
import PlainButton from "../buttons/PlainButton";
import DoorEffect from "../DoorEffect";

const SelectFieldOption = React.memo(({ active, option: { label, value }, onClick }) => {
  const className = active ? "chq-ffd--sl--opt-act" : null;

  return (
    <PlainButton className={className} onClick={() => onClick(value)}>
      {label}
    </PlainButton>
  );
});

class SelectField extends Component {
  buttonRef = React.createRef();

  selectRef = React.createRef();

  state = { open: false };

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.buttonRef.current.focus();
    }

    window.addEventListener("click", this.handleWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
  }

  handleWindowClick = event => {
    const { open } = this.state;

    if (open && !this.selectRef.current.contains(event.target)) {
      this.setState({ open: false });
    }
  };

  handleClick = value => {
    const { name, onChange, onFormChange } = this.props;
    this.setState({ open: false });

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }
  };

  handleToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    const {
      autoFocus, children, className, onChange, onFormChange, onError, name,
      options = [], required, submitted, value, ...props
    } = this.props;

    const { open } = this.state;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div ref={this.selectRef} className="chq-ffd--sl">
          <input type="hidden" id={name} name={name} value={value} />
          <button
            type="button"
            ref={this.buttonRef}
            className="chq-ffd--sl--tog"
            onClick={this.handleToggle}
          >
            {value}
            <div className="chq-ffd--sl--ct" />
          </button>
          <DoorEffect className="chq-ffd--sl--opts" open={open}>
            {options.map(option => (
              <SelectFieldOption
                key={option.value}
                option={option}
                onClick={this.handleClick}
                active={option.value === value}
              />
            ))}
          </DoorEffect>
        </div>
      </label>
    );
  }
}

export default SelectField;
