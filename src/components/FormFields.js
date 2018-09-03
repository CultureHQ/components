import React, { Component, Fragment } from "react";

import classnames from "../classnames";

const extractValue = ({ target: { value } }) => value;

const extractFiles = ({ target: { files } }, { multiple }) => (
  multiple ? files : files[0]
);

const formFieldInput = type => ({ addon, name, value, ...props }) => (
  <Fragment>
    {addon && <span className="chq-ffd--ad">{addon}</span>}
    <input
      {...props}
      type={type}
      id={name}
      name={name}
      value={value || ""}
    />
  </Fragment>
);

const fileDisplayFrom = ({ multiple, value }) => (
  value && (multiple ? Array.from(value).map(({ name }) => name).join(", ") : value.name)
);

const FileFieldInput = ({ multiple, name, value, ...props }) => (
  <span className="chq-ffd--fi">
    <input
      {...props}
      type="file"
      id={name}
      name={name}
      multiple={multiple}
    />
    <input type="text" readOnly value={fileDisplayFrom({ multiple, value })} />
  </span>
);

const buildFormField = (eventToValue, FieldInput) => {
  class FormField extends Component {
    state = { error: null, touched: false };

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

    handleBlur = () => {
      this.setState({ touched: true });
    };

    handleChange = event => {
      const { name, onChange, onFormChange } = this.props;
      const value = eventToValue(event, this.props);

      if (onChange) {
        onChange(value);
      }

      if (onFormChange) {
        onFormChange(name, value);
      }
    };

    deriveError = () => {
      const { name, onError, required, validator, value } = this.props;

      let error = null;

      if (required && !value) {
        error = "Required";
      } else if (validator) {
        error = validator(value);
      }

      this.setState({ error });

      if (onError) {
        onError(name, error);
      }
    };

    render() {
      const {
        children, className, name, onError, onFormChange, required, submitted,
        validator, ...props
      } = this.props;

      const { error, touched } = this.state;

      console.log("RERENDERING", name);

      return (
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <FieldInput
            {...props}
            name={name}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
          {error && (submitted || touched) && (
            <p className="chq-ffd--rq">{error}</p>
          )}
        </label>
      );
    }
  }

  return FormField;
};

export const EmailField = buildFormField(extractValue, formFieldInput("email"));
export const NumberField = buildFormField(extractValue, formFieldInput("number"));
export const PasswordField = buildFormField(extractValue, formFieldInput("password"));
export const StringField = buildFormField(extractValue, formFieldInput("text"));
export const FileField = buildFormField(extractFiles, FileFieldInput);
