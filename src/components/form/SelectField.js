import React, { Component } from "react";

import FormError from "./FormError";
import classnames from "../../classnames";

class SelectField extends Component {
  handleChange = ({ target: { value } }) => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }
  };

  render() {
    const {
      children, className, onChange, onFormChange, onError, name, options,
      required, submitted, touched, validator, value, ...props
    } = this.props;

    return (
      <div className={classnames("chq-ffd", className)}>
        <span className="chq-ffd--lb">{children}</span>
        <div className="chq-ffd--sl">
          <select
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
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={value}
        />
      </div>
    );
  }
}

export default SelectField;
