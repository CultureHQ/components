import React from "react";

import { FormValue } from "./Form";
import { FormFieldError } from "./typings";

type FormErrorProps = {
  onError: (name: string, error: FormFieldError) => void;
  name: string;
  required?: boolean;
  submitted: boolean;
  touched: boolean;
  validator?: (value: any) => FormFieldError;
  value?: FormValue;
};

type FormErrorState = {
  error: string | null;
};

class FormError extends React.Component<FormErrorProps, FormErrorState> {
  state = { error: null };

  componentDidMount() {
    this.deriveError();
  }

  componentDidUpdate(prevProps: FormErrorProps) {
    const { required, validator, value } = this.props;

    if (
      required !== prevProps.required
      || validator !== prevProps.validator
      || value !== prevProps.value
    ) {
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
