import * as React from "react";

import classnames from "../../../classnames";
import FormError from "../FormError";
import { FormState } from "../Form";
import { FormFieldError, SelectOption, SelectValue } from "../typings";

import SelectFieldSingleValue from "./SelectFieldSingleValue";
import SelectFieldOptions from "./SelectFieldOptions";
import fuzzyFilter from "./fuzzyFilter";

type SelectFieldSingleProps = FormState & {
  creatable: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  name: string;
  onChange?: (value: null | SelectValue) => void;
  onFocus: () => void;
  options: SelectOption[];
  placeholder: string;
  required: boolean;
  selectRef: React.RefObject<HTMLDivElement>;
  validator?: (value: null | SelectValue) => FormFieldError;
  value?: null | SelectValue;
};

type SelectFieldSingleState = {
  display: string;
  filteredOptions: SelectOption[];
  open: boolean;
  touched: boolean;
};

const getDisplay = (props: SelectFieldSingleProps) => {
  const normal = props.value || (props.values[props.name] as undefined | null | SelectValue);
  let display = "";

  if (normal !== undefined) {
    const match = props.options.find(({ value }) => value === normal);
    display = match ? match.label : "";
  }

  return display;
};

class SelectFieldSingle extends React.Component<SelectFieldSingleProps, SelectFieldSingleState> {
  private timeout: null | number;

  constructor(props: SelectFieldSingleProps) {
    super(props);

    this.state = {
      display: getDisplay(props),
      filteredOptions: props.options,
      open: false,
      touched: false
    };

    this.timeout = null;
  }

  componentDidMount() {
    window.addEventListener("click", this.handleWindowClick);
  }

  componentDidUpdate(prevProps: SelectFieldSingleProps) {
    const { options } = this.props;
    const { display } = this.state;

    if (prevProps.options !== options) {
      this.setState({
        display: getDisplay(this.props),
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

    const passed = values[name] as undefined | null | SelectValue;
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
      this.selectValue(this.getValue());
    }
  };

  handleSelect = (selected: SelectValue) => {
    const { onFocus } = this.props;

    onFocus();
    this.selectValue(selected);
    this.propagateValue(selected);
  };

  handleDeselect = () => {
    const { onFocus } = this.props;

    onFocus();
    this.selectValue(null);
    this.propagateValue(null);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { options } = this.props;
    const { display } = this.state;

    const normal = this.getValue();
    const currentOption = (normal !== null && options.find(option => option.value === normal));

    let nextDisplay = event.target.value;
    nextDisplay = currentOption && currentOption.label === display ? (event.nativeEvent as any).data : nextDisplay;

    this.setState({
      display: nextDisplay || "",
      filteredOptions: fuzzyFilter(options, nextDisplay),
      open: true
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, touched: true });
  };

  propagateValue = (value: null | SelectValue) => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  selectValue = (nextValue: null | SelectValue) => {
    const { options } = this.props;

    const match = options.find(({ value }) => value === nextValue);
    const display = match ? match.label : (nextValue || "");

    this.setState({ display, touched: true, open: false }, () => {
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
    });
  };

  /* eslint-disable jsx-a11y/label-has-for */
  // we're following the rules for it but it can't figure that out
  render() {
    const {
      creatable, inputRef, name, onError, options, placeholder, required,
      selectRef, submitted, validator, value, values
    } = this.props;

    const { display, filteredOptions, open, touched } = this.state;

    const normal = this.getValue();

    return (
      <>
        <div ref={selectRef} className="chq-ffd--sl">
          <SelectFieldSingleValue
            display={display}
            inputRef={inputRef}
            name={name}
            onChange={this.handleChange}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            open={open}
            placeholder={placeholder}
            value={normal}
          />
          <SelectFieldOptions
            creatable={creatable}
            display={display}
            filteredOptions={filteredOptions}
            multiple={false}
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

export default SelectFieldSingle;
