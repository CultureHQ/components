import React from "react";

import FormError from "../FormError";
import { FormState } from "../Form";
import { FormFieldError, SelectOption, SelectValue } from "../typings";

import SelectFieldMultiValue from "./SelectFieldMultiValue";
import SelectFieldOptions from "./SelectFieldOptions";
import fuzzyFilter from "./fuzzyFilter";

type SelectFieldMultiProps = Omit<FormState, "disabled"> & {
  creatable: boolean;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  name: string;
  onChange?: (value: null | SelectValue[]) => void;
  onFocus: () => void;
  options: SelectOption[];
  placeholder: string;
  required: boolean;
  selectRef: React.RefObject<HTMLDivElement>;
  validator?: (value: null | SelectValue[]) => FormFieldError;
  value?: null | SelectValue[];
};

type SelectFieldMultiState = {
  display: string;
  filteredOptions: SelectOption[];
  open: boolean;
  touched: boolean;
};

class SelectFieldMulti extends React.Component<SelectFieldMultiProps, SelectFieldMultiState> {
  private timeout: null | number;

  constructor(props: SelectFieldMultiProps) {
    super(props);

    this.state = {
      display: "",
      filteredOptions: props.options,
      open: false,
      touched: false
    };

    this.timeout = null;
  }

  componentDidMount() {
    window.addEventListener("click", this.handleWindowClick);
  }

  componentDidUpdate(prevProps: SelectFieldMultiProps) {
    const { options } = this.props;
    const { display } = this.state;

    if (prevProps.options !== options) {
      this.setState({
        display: "",
        filteredOptions: fuzzyFilter(options, display)
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  getValue = () => {
    const { name, value, values } = this.props;

    if (value !== undefined) {
      return value;
    }

    const passed = values[name] as undefined | null | SelectValue[];
    if (passed !== undefined) {
      return passed;
    }

    return null;
  };

  handleWindowClick = (event: Event) => {
    const { selectRef } = this.props;
    const { open } = this.state;

    const select = selectRef.current;

    if (open && select && event.target instanceof Element && !select.contains(event.target)) {
      this.selectValue(this.getValue(), true);
    }
  };

  handleSelect = (selected: SelectValue) => {
    const { onFocus } = this.props;

    const normal = this.getValue();
    const nextValue = normal ? [...normal.filter(item => item !== selected), selected] : [selected];

    onFocus();
    this.selectValue(nextValue, false);
    this.propagateValue(nextValue);
  };

  handleDeselect = (deselected: SelectValue) => {
    const { onFocus } = this.props;

    const normal = this.getValue();
    const nextValue = normal ? normal.filter(item => item !== deselected) : null;

    onFocus();
    this.selectValue(nextValue, false);
    this.propagateValue(nextValue);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { options } = this.props;
    const nextDisplay = event.target.value;

    this.setState({
      display: nextDisplay || "",
      filteredOptions: fuzzyFilter(options, nextDisplay),
      open: true
    });
  };

  handleOpen = () => {
    const { onFocus } = this.props;

    onFocus();
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, touched: true });
  };

  propagateValue = (value: null | SelectValue[]) => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  selectValue = (nextValue: null | SelectValue[], shouldClose: boolean) => {
    const { options } = this.props;

    this.setState(
      (prevState: SelectFieldMultiState) => ({
        display: "",
        touched: true,
        open: shouldClose ? false : prevState.open
      }),
      () => {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }

        this.timeout = window.setTimeout(
          () => {
            this.setState({ filteredOptions: options });
            this.timeout = null;
          },
          150
        );
      }
    );
  };

  /* eslint-disable jsx-a11y/label-has-for */
  // we're following the rules for it but it can't figure that out
  render() {
    const {
      creatable, disabled, inputRef, name, onError, options, placeholder,
      required, selectRef, submitted, validator
    } = this.props;

    const { display, filteredOptions, open, touched } = this.state;

    const normal = this.getValue();

    return (
      <>
        <div ref={selectRef} className="chq-ffd--sl">
          <SelectFieldMultiValue
            disabled={disabled}
            display={display}
            inputRef={inputRef}
            name={name}
            onChange={this.handleChange}
            onClose={this.handleClose}
            onDeselect={this.handleDeselect}
            onOpen={this.handleOpen}
            open={open}
            options={options}
            placeholder={placeholder}
            value={normal}
          />
          <SelectFieldOptions
            creatable={creatable}
            display={display}
            filteredOptions={filteredOptions}
            multiple
            onDeselect={this.handleDeselect}
            onSelect={this.handleSelect}
            open={open}
            options={options}
            value={normal}
          />
        </div>
        <FormError
          name={name}
          onError={onError}
          required={required}
          submitted={submitted}
          touched={touched}
          validator={validator}
          value={normal}
        />
      </>
    );
  }
}

export default SelectFieldMulti;
