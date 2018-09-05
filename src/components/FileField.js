import React, { Component } from "react";

import classnames from "../classnames";
import FormError from "./FormError";

class FileField extends Component {
  state = { touched: false };

  getFileDisplay() {
    const { multiple, value } = this.props;

    if (!value) {
      return "";
    }

    if (multiple) {
      return Array.from(value).map(({ name }) => name).join(", ");
    }

    return value.name;
  }

  handleChange = ({ target: { files } }) => {
    this.setState({ touched: true });

    const { multiple, name, onChange, onFormChange } = this.props;
    let value = null;

    if (files.length > 0) {
      value = multiple ? files : files[0];
    }

    if (onChange) {
      onChange(value);
    }

    if (onFormChange) {
      onFormChange(name, value);
    }
  };

  render() {
    const { name } = this.props;
    const {
      children, className, onError, onFormChange, required, submitted,
      validator, value, ...props
    } = this.props;

    const { touched } = this.state;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <span className="chq-ffd--fi">
          <input {...props} type="file" id={name} onChange={this.handleChange} />
          <input type="text" readOnly value={this.getFileDisplay()} />
        </span>
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={value}
        />
      </label>
    );
  }
}

export default FileField;
