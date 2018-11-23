import React, { Component } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";

class FileField extends Component {
  static defaultProps = {
    autoFocus: false,
    multiple: false,
    onChange: () => {},
    onFormChange: () => {},
    values: {}
  };

  inputRef = React.createRef();

  state = { touched: false };

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.inputRef.current.focus();
    }
  }

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

    onChange(value);
    onFormChange(name, value);
  };

  render() {
    const {
      autoFocus, children, className, errors, multiple, name, onError,
      onFormChange, required, submitted, submitting, validator, value, values,
      ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || values[name];

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div className="chq-ffd--fi">
          <input
            className="chq-ffd--ctrl"
            ref={this.inputRef}
            {...props}
            type="file"
            multiple={multiple}
            id={name}
            name={name}
            onChange={this.handleChange}
          />
          <div className="chq-ffd--di">
            <div className="chq-ffd--ch">Choose file{multiple && "s"}...</div>
            <div className="chq-ffd--fd">{this.getFileDisplay()}</div>
          </div>
        </div>
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={normal}
        />
      </label>
    );
  }
}

export default FileField;
