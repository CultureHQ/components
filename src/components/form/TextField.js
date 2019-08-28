import React, { Component } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";
import { withForm } from "./Form";

class TextField extends Component {
  static defaultProps = {
    autoFocus: false,
    onChange: () => {},
    onFormChange: () => {},
    values: {}
  };

  textAreaRef = React.createRef();

  state = { touched: false };

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.textAreaRef.current.focus();
    }
  }

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
      autoFocus, children, className, errors, name, onError, onFormChange,
      required, submitted, submitting, validator, value, values, ...props
    } = this.props;

    const { touched } = this.state;

    const normal = value || values[name];

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <textarea
          className="chq-ffd--ctrl chq-ffd--ctrl-text"
          ref={this.textAreaRef}
          {...props}
          id={name}
          name={name}
          value={normal || ""}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
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

export default withForm(TextField);
