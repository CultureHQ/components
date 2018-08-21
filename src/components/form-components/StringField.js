import React, { Component } from "react";
import classnames from "classnames";

class StringField extends Component {
  state = { touched: false, value: null };

  getRequired = () => {
    const { required } = this.props;
    const { touched, value } = this.state;

    if (!required || !touched || value) {
      return null;
    }

    return <p className="chq-sfd--rq">Required</p>;
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ touched: true, value });
  };

  render() {
    const { className, label, name } = this.props;
    const { value } = this.state;

    return (
      <label className={classnames("chq-sfd", className)} htmlFor={name}>
        <span className="chq-sfd--lb">{label}</span>
        <input
          type="text"
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

export default StringField;
