import React, { Component } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { withForm } from "./Form";

const centsValidator = value => {
  if (value && parseFloat(value, 10) <= 0) {
    return "Value must be greater than $0.00";
  }
  return null;
};

class CentsField extends Component {
  inputRef = React.createRef();

  state = { touched: false };

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.inputRef.current.focus();
    }
  }

  handleBlur = () => {
    this.setState({ touched: true });
  };

  handleChange = ({ target: { value } }) => {
    const { name, onChange, onFormChange } = this.props;
    const amount = value ? Math.round(value * 100) : null;

    onChange(amount);
    onFormChange(name, amount);
  };

  render() {
    const {
      autoFocus, children, className, errors, name, onError, onFormChange,
      required, submitted, submitting, value, values, ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || values[name];

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <span className="chq-ffd--ad">$</span>
        <input
          className="chq-ffd--ctrl"
          ref={this.inputRef}
          {...props}
          type="number"
          id={name}
          name={name}
          min="0"
          step=".01"
          value={Number.isFinite(normal) ? normal / 100 : ""}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={centsValidator}
          value={normal}
        />
      </label>
    );
  }
}

CentsField.defaultProps = {
  autoFocus: false,
  onChange: () => {},
  onFormChange: () => {},
  values: {}
};

export default withForm(CentsField);
