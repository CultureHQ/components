import * as React from "react";

import classnames from "../../classnames";
import { ContainerProps } from "../../typings";

type FormValue = undefined | null | boolean | number | string | Blob | File;
type FormValues = { [key: string]: FormValue };

type FormProps = ContainerProps & {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void | Promise<any>;
};

export type FormState = {
  errors: { [key: string]: string };
  submitted: boolean;
  submitting: boolean;
  values: FormValues;
  onError: (name: string, error: string) => void;
  onFormChange: (name: string, value: FormValue) => void;
};

const { Provider, Consumer } = React.createContext<FormState>({
  errors: {},
  submitted: false,
  submitting: false,
  values: {},
  onError: (name: string, error: string) => {},
  onFormChange: (name: string, value: FormValue) => {}
});

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

  handleError = (name: string, error: string) => {
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
      <Provider value={this.state}>
        <form className={classnames(className)} onSubmit={this.handleSubmit}>
          {children}
        </form>
      </Provider>
    );
  }
}

export const withForm = <P extends {}>(Child: React.ComponentType<P & FormState>) => {
  const Parent = (props: P) => (
    <Consumer>{state => <Child {...state} {...props} />}</Consumer>
  );

  const childName = Child.displayName || Child.name || "Component";
  Parent.displayName = `withForm(${childName})`;

  return Parent;
};

export default Form;
