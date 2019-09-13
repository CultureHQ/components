import React from "react";

import classnames from "../../../classnames";
import FormError from "../FormError";
import SelectFieldSingleValue from "./SelectFieldSingleValue";
import SelectFieldOptions from "./SelectFieldOptions";
import fuzzyFilter from "./fuzzyFilter";

const getDisplay = props => {
  const normal = props.value || props.values[props.name];
  let display = "";

  if (normal !== undefined) {
    display = props.options.find(({ value }) => value === normal);
    display = display ? display.label : "";
  }

  return display;
};

class SelectFieldSingle extends React.Component {
  inputRef = React.createRef();

  selectRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      display: getDisplay(props),
      filteredOptions: props.options,
      open: false,
      touched: false
    };
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.focus();
    }

    window.addEventListener("click", this.handleWindowClick);
  }

  componentDidUpdate(prevProps) {
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
    clearTimeout(this.timeout);
  }

  focus = () => {
    const input = this.inputRef.current;

    if (input) {
      input.focus();
    }
  };

  handleWindowClick = event => {
    const { name, value, values } = this.props;
    const { open } = this.state;

    const select = this.selectRef.current;

    if (open && select && event.target instanceof Element && !select.contains(event.target)) {
      this.selectValue(value || values[name]);
    }
  };

  handleSelect = selected => {
    this.focus();
    this.selectValue(selected);
    this.propagateValue(selected);
  };

  handleDeselect = () => {
    this.focus();
    this.selectValue(null);
    this.propagateValue(null);
  };

  handleChange = event => {
    const { multiple, name, options, value, values } = this.props;
    const { display } = this.state;

    const normal = value || values[name];
    const currentOption = (normal && options.find(option => option.value === normal)) || {};

    let nextDisplay = event.target.value;
    nextDisplay = currentOption.label === display ? event.nativeEvent.data : nextDisplay;

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

  propagateValue = value => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  selectValue = nextValue => {
    const { options } = this.props;

    const match = options.find(({ value }) => value === nextValue);
    const display = match ? match.label : (nextValue || "");

    this.setState({ display, touched: true, open: false }, () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(
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
      creatable = false, name, onError, options, placeholder, required,
      submitted, validator, value, values
    } = this.props;

    const { display, filteredOptions, open, touched } = this.state;

    const normal = value || values[name];

    return (
      <>
        <div ref={this.selectRef} className="chq-ffd--sl">
          <SelectFieldSingleValue
            display={display}
            inputRef={this.inputRef}
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
