import React, { Component } from "react";
import classnames from "classnames";

class FormField extends Component {
  state = { touched: false, value: null };

  componentDidUpdate(prevProps) { /* eslint react/no-did-update-set-state: "off" */
    const { touched } = this.props;

    if (touched !== prevProps.touched) {
      this.setState({ touched: true });
    }
  }

  getRequired = () => {
    const { required } = this.props;
    const { touched, value } = this.state;

    if (!required || !touched || value) {
      return null;
    }

    return <p className="chq-ffd--rq">Required</p>;
  };

  handleChange = ({ target: { value } }) => {
    const { name, onValueChange } = this.props;

    if (onValueChange) {
      onValueChange({ [name]: value });
    }

    this.setState({ touched: true, value });
  };

  render() {
    const {
      className,
      label,
      name,
      required,
      type
    } = this.props;

    const { value } = this.state;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{label}</span>
        <input
          type={type}
          id={name}
          name={name}
          onChange={this.handleChange}
          value={value || ""}
          required={required}
        />
        {this.getRequired()}
      </label>
    );
  }
}

const buildFormField = type => props => <FormField {...props} type={type} />;

export const EmailField = buildFormField("email");
export const NumberField = buildFormField("number");
export const StringField = buildFormField("text");
export const PasswordField = buildFormField("password");
