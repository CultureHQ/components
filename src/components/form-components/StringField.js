import React, { Component } from "react";
import classnames from "classnames";

class StringField extends Component {
  state = { value: null };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    const { className, label, name } = this.props;
    const { value } = this.state;

    return (
      <label className={classnames("chq-sfd", className)} htmlFor={name}>
        <span>{label}</span>
        <input
          type="text"
          id={name}
          name={name}
          onChange={this.handleChange}
          value={value || ""}
        />
      </label>
    );
  }
}

export default StringField;
