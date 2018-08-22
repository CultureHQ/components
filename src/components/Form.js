import React, { Component } from "react";

import classnames from "../classnames";

import { SubmitButton } from "./Button";
import CentsField from "./CentsField";
import { EmailField, NumberField, PasswordField, StringField } from "./FormFields";

const contains = haystack => needle => haystack.indexOf(needle) > -1;
const isField = contains([CentsField, EmailField, NumberField, PasswordField, StringField]);

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
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
    const { submitting, touched } = this.state;

    return React.Children.map(children, child => {
      const { type, props } = child;

      if (isField(type)) {
        return React.cloneElement(child, {
          onValueChange: this.handleValueChange,
          initialValues,
          touched
        });
      }

      if (type === SubmitButton) {
        return React.cloneElement(child, {
          disabled: props.disabled || submitting
        });
      }

      return child;
    });
  };

  handleValueChange = mutation => {
    this.setState(({ values }) => ({
      values: { ...values, ...mutation }
    }));
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { values } = this.state;

    this.setState({ submitting: true });
    event.preventDefault();

    if (!this.getIsValidSubmission()) {
      this.setState({ touched: true });
      return;
    }

    const doneSubmitting = () => this.setState({ submitting: false });
    onSubmit(values).then(doneSubmitting).catch(doneSubmitting);
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
