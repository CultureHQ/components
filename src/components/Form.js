import React, { Component } from "react";

import classnames from "../classnames";

import CentsField from "./CentsField";
import { EmailField, NumberField, PasswordField, StringField } from "./FormFields";

const FIELDS = [CentsField, EmailField, NumberField, PasswordField, StringField];
const isField = type => FIELDS.indexOf(type) > -1;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      values: props.initialValues || {}
    };
  }

  getIsValidSubmission = () => {
    const { children } = this.props;
    const { values } = this.state;

    return children.every(({ type, props: { required, name } }) => (
      !isField(type) || !required || values[name]
    ));
  };

  getChildren = () => {
    const { children, initialValues } = this.props;
    const { touched } = this.state;

    const mutations = {
      onValueChange: this.handleValueChange,
      initialValues,
      touched
    };

    return React.Children.map(children, child => (
      isField(child.type) ? React.cloneElement(child, mutations) : child
    ));
  };

  handleValueChange = mutation => {
    this.setState(({ values }) => ({ values: { ...values, ...mutation } }));
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { values } = this.state;

    event.preventDefault();

    if (!this.getIsValidSubmission()) {
      this.setState({ touched: true });
      return;
    }

    onSubmit(values);
  };

  render() {
    const { className } = this.props;

    return (
      <form className={classnames(className)} onSubmit={this.handleSubmit}>
        {this.getChildren()}
      </form>
    );
  }
}

export default Form;
