import React from "react";

import classnames from "../../../classnames";
import FormError from "../FormError";
import SelectFieldMultiValue from "./SelectFieldMultiValue";
import SelectFieldOptions from "./SelectFieldOptions";
import fuzzyFilter from "./fuzzyFilter";

class SelectFieldMulti extends React.Component {
  inputRef = React.createRef();

  selectRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      display: "",
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
        display: "",
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
      this.selectValue(value || values[name], true);
    }
  };

  handleSelect = selected => {
    const { name, value, values } = this.props;

    const normal = value || values[name];
    const nextValue = normal ? [...normal.filter(item => item !== selected), selected] : [selected]

    this.focus();
    this.selectValue(nextValue, false);
    this.propagateValue(nextValue);
  };

  handleDeselect = deselected => {
    const { name, value, values } = this.props;

    const normal = value || values[name];
    const nextValue = normal.filter(item => item !== deselected);

    this.focus();
    this.selectValue(nextValue, false);
    this.propagateValue(nextValue);
  };

  handleChange = event => {
    const { name, options, value, values } = this.props;
    const { display } = this.state;

    const nextDisplay = event.target.value;

    this.setState({
      display: nextDisplay || "",
      filteredOptions: fuzzyFilter(options, nextDisplay),
      open: true
    });
  };

  handleOpen = () => {
    this.focus();
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

  selectValue = (nextValue, shouldClose) => {
    const { options } = this.props;
    const effects = shouldClose ? { open: false } : {};

    this.setState({ display: "", touched: true, ...effects }, () => {
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
          <SelectFieldMultiValue
            display={display}
            inputRef={this.inputRef}
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
