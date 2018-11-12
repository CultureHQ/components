import React, { Component } from "react";

import classnames from "../../classnames";
import SelectFieldValue from "./select/SelectFieldValue";
import SelectFieldOptions from "./select/SelectFieldOptions";

const appendValue = (value, selected) => (
  value ? [...value.filter(item => item !== selected), selected] : [selected]
);

const fuzzyFilter = matchable => {
  const terms = matchable.toLowerCase().split(" ").filter(Boolean);

  return ({ label }) => label.toLowerCase().split(" ").filter(Boolean).some(segment => (
    terms.some(term => segment.startsWith(term))
  ));
};

class SelectField extends Component {
  static defaultProps = {
    autoFocus: false,
    creatable: false,
    multiple: false,
    onChange: () => {},
    onFormChange: () => {},
    options: []
  };

  inputRef = React.createRef();

  selectRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      display: props.multiple ? "" : props.value,
      filteredOptions: props.options,
      open: false
    };
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.inputRef.current.focus();
    }

    window.addEventListener("click", this.handleWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
  }

  handleWindowClick = event => {
    const { value } = this.props;
    const { open } = this.state;

    if (open && !this.selectRef.current.contains(event.target)) {
      this.selectValue(value, true);
    }
  };

  handleSelect = selected => {
    const { multiple, value } = this.props;
    const nextValue = multiple ? appendValue(value, selected) : selected;

    this.inputRef.current.focus();
    this.selectValue(nextValue, !multiple);
    this.propagateValue(nextValue);
  };

  handleDeselect = deselected => {
    const { multiple, value } = this.props;
    const nextValue = multiple ? value.filter(item => item !== deselected) : "";

    this.inputRef.current.focus();
    this.selectValue(nextValue, !multiple);
    this.propagateValue(nextValue);
  };

  handleChange = event => {
    const { multiple, options, value } = this.props;
    const { display } = this.state;

    const nextDisplay = ((!multiple && value === display) ? event.nativeEvent.data : event.target.value) || "";

    this.setState({
      display: nextDisplay,
      filteredOptions: nextDisplay ? options.filter(fuzzyFilter(nextDisplay)) : options,
      open: true
    });
  };

  handleOpen = () => {
    const { multiple } = this.props;

    if (multiple) {
      this.inputRef.current.focus();
    }

    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  propagateValue = value => {
    const { name, onChange, onFormChange } = this.props;

    onChange(value);
    onFormChange(name, value);
  };

  selectValue = (value, shouldClose) => {
    const { multiple, options } = this.props;
    const effects = shouldClose ? { open: false } : {};

    this.setState({ display: multiple ? "" : value, ...effects }, () => (
      setTimeout(() => this.setState({ filteredOptions: options }), 150)
    ));
  };

  /* eslint-disable jsx-a11y/label-has-for */
  // we're following the rules for it but it can't figure that out
  render() {
    const { children, className, creatable, multiple, name, value } = this.props;
    const { display, filteredOptions, open } = this.state;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div ref={this.selectRef} className="chq-ffd--sl">
          <SelectFieldValue
            display={display}
            inputRef={this.inputRef}
            multiple={multiple}
            name={name}
            onChange={this.handleChange}
            onClose={this.handleClose}
            onDeselect={this.handleDeselect}
            onOpen={this.handleOpen}
            open={open}
            value={value}
          />
          <SelectFieldOptions
            creatable={creatable}
            display={display}
            filteredOptions={filteredOptions}
            multiple={multiple}
            onDeselect={this.handleDeselect}
            onSelect={this.handleSelect}
            open={open}
            value={value}
          />
        </div>
      </label>
    );
  }
}

export default SelectField;
