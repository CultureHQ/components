import React, { Component } from "react";

import classnames from "../../classnames";
import FormError from "./FormError";

class TextField extends Component {
  static defaultProps = {
    autoFocus: false,
    onChange: () => {},
    onFormChange: () => {}
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
    const { name, value } = this.props;
    const {
      autoFocus, children, className, onError, onFormChange, required,
      submitted, validator, ...props
    } = this.props;

    const { touched } = this.state;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <textarea
          ref={this.textAreaRef}
          {...props}
          id={name}
          value={value || ""}
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
          value={value}
        />
      </label>
    );
  }
}

export default TextField;
