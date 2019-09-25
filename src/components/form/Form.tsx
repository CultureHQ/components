import * as React from "react";

import { FormFieldError } from "./typings";

export type FormValue = (
  undefined | null | boolean | number | string | string[] | File | FileList | Blob
);

export type FormValues = { [key: string]: FormValue };

type FormProps = {
  children: React.ReactNode;
  className?: string;
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void | Promise<any>;
};

export type FormState = {
  errors: { [key: string]: FormFieldError };
  submitted: boolean;
  submitting: boolean;
  values: FormValues;
  onError: (name: string, error: FormFieldError) => void;
  onFormChange: (name: string, value: FormValue) => void;
};

const FormContext = React.createContext<FormState>({
  errors: {},
  submitted: false,
  submitting: false,
  values: {},
  onError: () => {},
  onFormChange: () => {}
});

export const useForm = () => React.useContext(FormContext);

/* eslint-disable react/no-unused-state */
class Form extends React.Component<FormProps, FormState> {
  private componentIsMounted: boolean;

  constructor(props: FormProps) {
    super(props);

    this.componentIsMounted = false;
    this.state = {
      errors: {},
      submitted: false,
      submitting: false,
      values: props.initialValues || {},
      onError: this.handleError,
      onFormChange: this.handleFormChange
    };
  }

  componentDidMount() {
    this.componentIsMounted = true;
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  handleError = (name: string, error: FormFieldError) => {
    this.setState(({ errors }) => ({
      errors: { ...errors, [name]: error }
    }));
  };

  handleFormChange = (name: string, value: FormValue) => {
    this.setState(({ values }) => ({
      values: { ...values, [name]: value }
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.submit();
  };

  handleDoneSubmitting = () => {
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
      } else {
        this.setState({ submitting: false });
      }
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <FormContext.Provider value={this.state}>
        <form className={className} onSubmit={this.handleSubmit}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
}

export const withForm = <P extends {}>(Child: React.ComponentType<P & FormState>) => {
  const Parent = (props: P) => (
    <FormContext.Consumer>
      {state => <Child {...state} {...props} />}
    </FormContext.Consumer>
  );

  const childName = Child.displayName || Child.name || "Component";
  Parent.displayName = `withForm(${childName})`;

  return Parent;
};

export default Form;
