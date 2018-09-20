import React, { Component } from "react";

import classnames from "../classnames";

import SubmitButton from "./SubmitButton";
import BooleanField from "./BooleanField";
import CentsField from "./CentsField";
import FileField from "./FileField";
import { EmailField, NumberField, PasswordField, StringField } from "./FormFields";

const contains = haystack => needle => haystack.indexOf(needle) > -1;

const isField = contains([
  CentsField,
  EmailField,
  FileField,
  NumberField,
  PasswordField,
  StringField
]);

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

  componentDidMount() {
    this.componentIsMounted = true;
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
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

      if (type === BooleanField) {
        return React.cloneElement(child, {
          onFormChange: this.handleFormChange,
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
    event.preventDefault();
    this.submit();
  };

  handleDoneSubmitting() {
    if (this.componentIsMounted) {
      this.setState({ submitting: false });
    }
  };

  submit() {
    const { onSubmit } = this.props;
    const { errors, values } = this.state;

    this.setState({ submitted: true });

    if (Object.keys(errors).every(name => !errors[name])) {
      this.setState({ submitting: true });

      const submitted = onSubmit(values);
      if (submitted && submitted.then) {
        submitted.then(this.handleDoneSubmitting).catch(this.handleDoneSubmitting);
      }
    }
  }

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
