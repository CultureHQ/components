import React, { useContext } from "react";

import { FormFieldError } from "./typings";

export type FormValue = (
  undefined | null | boolean | number | string | string[] | File | FileList | Blob
);

export type FormValues = { [key: string]: FormValue };

type FormProps = Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  children: React.ReactNode;
  className?: string;
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void | Promise<any>;
};

export type FormState = {
  disabledStates: { [K in keyof FormValues]?: boolean };
  errors: { [key: string]: FormFieldError };
  submitted: boolean;
  submitting: boolean;
  values: FormValues;
  onError: (name: string, error: FormFieldError) => void;
  onFieldDisabledChange: (name: string, value: boolean | undefined) => void;
  onFormChange: (name: string, value: FormValue) => void;
};

const FormContext = React.createContext<FormState>({
  disabledStates: {},
  errors: {},
  submitted: false,
  submitting: false,
  values: {},
  onError: () => {},
  onFieldDisabledChange: () => {},
  onFormChange: () => {}
});

export const useForm = (): FormState => useContext(FormContext);

type FormComponentProps = Omit<FormProps, "initialValues" | "onSubmit"> & {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const FormComponent: React.FC<FormComponentProps> = React.memo(({ children, ...props }) => (
  <form {...props} aria-label="form">
    {children}
  </form>
));

/* eslint-disable react/no-unused-state */
class Form extends React.Component<FormProps, FormState> {
  private componentIsMounted: boolean;

  constructor(props: FormProps) {
    super(props);

    this.componentIsMounted = false;
    this.state = {
      disabledStates: {},
      errors: {},
      submitted: false,
      submitting: false,
      values: props.initialValues || {},
      onError: this.handleError,
      onFieldDisabledChange: this.handleFieldDisabledChange,
      onFormChange: this.handleFormChange
    };
  }

  componentDidMount(): void {
    this.componentIsMounted = true;
  }

  componentWillUnmount(): void {
    this.componentIsMounted = false;
  }

  handleError = (name: string, error: FormFieldError): void => {
    this.setState(({ errors }) => ({
      errors: { ...errors, [name]: error }
    }));
  };

  handleFormChange = (name: string, value: FormValue): void => {
    this.setState(({ values }) => ({
      values: { ...values, [name]: value }
    }));
  };

  handleFieldDisabledChange = (name: string, value: boolean | undefined): void => {
    this.setState(({ disabledStates }) => ({
      disabledStates: { ...disabledStates, [name]: value }
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.submit();
  };

  handleDoneSubmitting = (): void => {
    if (this.componentIsMounted) {
      this.setState({ submitting: false });
    }
  };

  submit(): void {
    const { onSubmit } = this.props;
    const { disabledStates, errors, values } = this.state;

    this.setState({ submitted: true });

    if (Object.keys(errors).every(name => !errors[name])) {
      this.setState({ submitting: true });

      const submitValues: FormValues = {};

      Object.keys(values).forEach((name: keyof typeof values) => {
        if (!disabledStates[name]) {
          submitValues[name] = values[name];
        }
      });

      const submitted = onSubmit(submitValues);

      if (submitted && submitted.then) {
        submitted.then(this.handleDoneSubmitting).catch(this.handleDoneSubmitting);
      } else {
        this.setState({ submitting: false });
      }
    }
  }

  render(): React.ReactElement {
    const { children, initialValues, onSubmit, ...props } = this.props;

    return (
      <FormContext.Provider value={this.state}>
        <FormComponent {...props} onSubmit={this.handleSubmit}>
          {children}
        </FormComponent>
      </FormContext.Provider>
    );
  }
}

export const withForm = <P extends Record<string, unknown>>(
  Child: React.ComponentType<P & FormState>
): React.FC<P> => {
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
