import React, { Component } from "react";

class FormError extends Component {
  state = { error: null };

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
    const { name, onError, required, validator, value } = this.props;

    let error = null;

    if (required && !value && value !== false) {
      error = "Required";
    } else if (validator) {
      error = validator(value);
    }

    this.setState({ error });

    if (onError) {
      onError(name, error);
    }
  }

  render() {
    const { submitted, touched } = this.props;
    const { error } = this.state;

    if (!error || !(submitted || touched)) {
      return null;
    }

    return <p className="chq-ffd--rq">{error}</p>;
  }
}

export default FormError;
