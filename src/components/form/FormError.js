import React, { Component } from "react";

import { withForm } from "./Form";

class FormError extends Component {
  componentDidMount() {
    this.deriveError();
  }

  componentDidUpdate(prevProps) {
    const updateRequired = ["required", "validator", "value"].some(propName => {
      const { [propName]: propValue } = this.props;

      return propValue !== prevProps[propName];
    });

    if (updateRequired) {
      this.deriveError();
    }
  }

  deriveError() {
    const { errors, name, onError, required, validator, value } = this.props;

    // This is undefined on purpose so that when we compare against the previous
    // value it doesn't unnecessarily update when there's no error on first
    // render.
    let error = undefined;

    if (required && !value && value !== false) {
      error = "Required";
    } else if (validator) {
      error = validator(value);
    }

    if (error !== errors[name]) {
      onError(name, error);
    }
  }

  render() {
    const { errors, name, submitted, touched } = this.props;
    const error = errors[name];

    if (!error || !(submitted || touched)) {
      return null;
    }

    return <p className="chq-ffd--rq">{error}</p>;
  }
}

export default withForm(FormError);
