import React, { Component } from "react";

import classnames from "../classnames";

import SubmitButton from "./SubmitButton";
import CentsField from "./CentsField";
import { EmailField, NumberField, PasswordField, StringField } from "./FormFields";

const contains = haystack => needle => haystack.indexOf(needle) > -1;
const isField = contains([CentsField, EmailField, NumberField, PasswordField, StringField]);

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      submitting: false,
      values: props.initialValues || {},
      errors: {}
    };
  }

  getChildren = () => {
    const { children } = this.props;
    const { submitted, submitting, values } = this.state;

    return React.Children.map(children, child => {
      const { type, props } = child;

      if (isField(type)) {
        return React.cloneElement(child, {
          onError: this.handleError,
          onFormChange: this.handleFormChange,
          submitted,
          value: values[props.name]
        });
      }

      if (type === SubmitButton) {
        return React.cloneElement(child, { submitting });
      }

      return child;
    });
  };

  handleError = (name, error) => {
    this.setState(({ errors }) => ({
      errors: { ...errors, [name]: error }
    }));
  };

  handleFormChange = (name, value) => {
    this.setState(({ values }) => ({
      values: { ...values, [name]: value }
    }));
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { errors, values } = this.state;

    this.setState({ submitted: true });
    event.preventDefault();

    if (Object.keys(errors).every(name => !errors[name])) {
      this.setState({ submitting: true });

      const doneSubmitting = () => this.setState({ submitting: false });
      onSubmit(values).then(doneSubmitting).catch(doneSubmitting);
    }
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
