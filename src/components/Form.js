import React, { Component } from "react";
import classnames from "classnames";

import Button from "./Button";

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

    return children.every(({ props: { required, name } }) => (
      !required || values[name]
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
      return false;
    }

    this.setState({ submitting: true });
    const doneSubmitting = () => this.setState({ submitting: false });

    onSubmit(values).then(doneSubmitting).catch(doneSubmitting);
    return true;
  };

  render() {
    const { children, className, initialValues } = this.props;
    const { submitting, touched } = this.state;

    return (
      <form className={classnames(className)} onSubmit={this.handleSubmit}>
        {React.Children.map(children, child => (
          React.cloneElement(child, {
            onValueChange: this.handleValueChange,
            initialValues,
            touched
          })
        ))}
        <Button
          primary
          type="submit"
          disabled={submitting}
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default Form;
