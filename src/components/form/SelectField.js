import React, { Component } from "react";

import classnames from "../../classnames";

class SelectField extends Component {
  selectRef = React.createRef();

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.selectRef.current.focus();
    }
  }

  handleChange = ({ target: { value } }) => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }
  };

  /* eslint-disable jsx-a11y/label-has-for */
  // but why?, this looks like it should actually be working
  render() {
    const {
      autoFocus, children, className, onChange, onFormChange, onError, name,
      options = [], required, submitted, value, ...props
    } = this.props;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div className="chq-ffd--sl">
          <select
            ref={this.selectRef}
            {...props}
            id={name}
            name={name}
            onChange={this.handleChange}
            value={value}
          >
            {options.map(({ label, value: optionValue }) => (
              <option key={optionValue} value={optionValue}>{label}</option>
            ))}
          </select>
          <div className="chq-ffd--sl--ct" />
        </div>
      </label>
    );
  }
}

export default SelectField;
