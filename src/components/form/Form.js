import React, { Component } from "react";

import classnames from "../../classnames";

const { Provider, Consumer } = React.createContext({
  errors: {},
  submitted: false,
  submitting: false,
  values: {},
  onError: () => {},
  onFormChange: () => {}
});

export const withForm = Child => {
  const Parent = props => (
    <Consumer>{state => <Child {...state} {...props} />}</Consumer>
  );

  const childName = Child.displayName || Child.name || "Component";
  Parent.displayName = `withForm(${childName})`;

  return Parent;
};

/* eslint-disable react/no-unused-state */
class Form extends Component {
  constructor(props) {
    super(props);

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

export default Form;
