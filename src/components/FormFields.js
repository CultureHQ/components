import React, { Component } from "react";
import classnames from "classnames";

class FormField extends Component {
  state = { touched: false, value: null };

  getRequired = () => {
    const { required } = this.props;
    const { touched, value } = this.state;

    if (!required || !touched || value) {
      return null;
    }

    return <p className="chq-ffd--rq">Required</p>;
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ touched: true, value });
  };

  render() {
    const {
      className,
      label,
      name,
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
