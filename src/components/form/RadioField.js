import React, { Component } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { withForm } from "./Form";

class RadioField extends Component {
  static defaultProps = {
    onChange: () => {},
    onFormChange: () => {},
    options: [],
    values: {}
  };

  state = { touched: false };

  handleBlur = () => {
    this.setState({ touched: true });
  };

  handleChange = ({ target: { value } }) => {
    const { name, onChange, onFormChange } = this.props;

    onChange(value);
    onFormChange(name, value);
  };

  render() {
    const {
      children, className, errors, name, onChange, onError, onFormChange,
      options, required, submitted, submitting, validator, value, values,
      ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || values[name];

    return (
      <fieldset className={classnames("chq-ffd", className)} {...props}>
        <legend className="chq-ffd--lb">{children}</legend>
        {options.map((option, index) => (
          <label key={option.value} className="chq-ffd--radio" htmlFor={`${name}${index + 1}`}>
            <input
              type="radio"
              id={`${name}${index + 1}`}
              name={name}
              value={option.value}
              checked={option.value.toString() === normal}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <em className="chq-ffd--radio-check" />
            {" "}
            {option.label}
          </label>
        ))}
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={normal}
        />
      </fieldset>
    );
  }
}

export default withForm(RadioField);
