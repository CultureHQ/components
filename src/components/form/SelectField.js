import React, { Component } from "react";

import classnames from "../../classnames";
import Badge from "../buttons/Badge";
import PlainButton from "../buttons/PlainButton";
import DoorEffect from "../DoorEffect";

const fuzzyMatch = matchable => {
  const terms = matchable.toLowerCase().split(" ");

  return value => value.toLowerCase().split(" ").some(segment => (
    terms.some(term => segment.startsWith(term))
  ));
};

const SelectFieldOption = React.memo(({ active, option: { label, value }, onClick }) => {
  const className = active ? "chq-ffd--sl--opt-act" : null;

  return (
    <PlainButton className={className} onClick={() => onClick(value)}>
      {label}
    </PlainButton>
  );
});

const SelectFieldSingleValue = ({ display, inputRef, multiple, name, onChange, onDeselect, onOpen, value }) => (
  <>
    <input type="hidden" id={name} name={name} value={value} />
    <input
      type="text"
      ref={inputRef}
      className="chq-ffd--ctrl"
      onClick={onOpen}
      onChange={onChange}
      value={display}
    />
    <div className="chq-ffd--sl--ct" />
  </>
);

const SelectFieldMultiValue = ({ display, inputRef, multiple, name, onChange, onDeselect, onOpen, value }) => (
  <div role="button" onClick={onOpen} className="chq-ffd--sl--tog">
    <input type="hidden" id={name} name={name} value={value} />
    {value && value.map(item => (
      <Badge key={item} icon="close" onClick={() => onDeselect(item)}>
        {item}
      </Badge>
    ))}
    <input type="text" ref={inputRef} onChange={onChange} value={display} />
    <div className="chq-ffd--sl--ct" />
  </div>
);

const SelectFieldValue = ({ multiple, ...props }) => (
  multiple ? <SelectFieldMultiValue {...props} /> : <SelectFieldSingleValue {...props} />
);

const SelectFieldOptions = ({ creatable, display, displayedOptions, multiple, onSelect, open, value }) => (
  <DoorEffect className="chq-ffd--sl--opts" open={open}>
    {creatable && (display.length > 0) && (!multiple || (display !== value)) && (
      <SelectFieldOption
        option={{ label: `Create option: ${display}`, value: display }}
        onClick={onSelect}
      />
    )}
    {displayedOptions.map(option => (
      <SelectFieldOption
        key={option.value}
        option={option}
        onClick={onSelect}
        active={multiple ? value.includes(option.value) : option.value === value}
      />
    ))}
    {!creatable && (displayedOptions.length === 0) && (!multiple || (display !== value)) && (
      <p>No results found.</p>
    )}
  </DoorEffect>
);

class SelectField extends Component {
  static defaultProps = {
    autoFocus: false,
    creatable: false,
    multiple: false,
    onChange: () => {},
    onFormChange: () => {}
  };

  inputRef = React.createRef();

  selectRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      display: props.multiple ? "" : props.value,
      displayedOptions: props.options,
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
    const { options, value } = this.props;
    const { open } = this.state;

    if (open && !this.selectRef.current.contains(event.target)) {
      this.selectValue(value);
    }
  };

  handleSelect = selected => {
    const { multiple, value } = this.props;
    const nextValue = multiple ? (value ? [...value, selected] : [selected]) : selected;

    this.selectValue(nextValue);
    this.propagateValue(nextValue);
  };

  handleDeselect = deselected => {
    const { value } = this.props;
    const nextValue = value.filter(item => item !== deselected);

    this.selectValue(nextValue);
    this.propagateValue(nextValue);
  };

  handleChange = event => {
    const { multiple, options, value } = this.props;
    const { display } = this.state;

    const nextDisplay = ((!multiple && value === display) ? event.nativeEvent.data : event.target.value) || "";
    const match = fuzzyMatch(nextDisplay);

    this.setState({
      display: nextDisplay,
      displayedOptions: options.filter(({ label }) => match(label))
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  propagateValue = value => {
    const { name, onChange, onFormChange } = this.props;

    onChange(value);
    onFormChange(name, value);
  };

  selectValue = value => {
    const { options } = this.props;

    this.setState({ display: value, open: false }, () => {
      setTimeout(() => this.setState({ displayedOptions: options }), 150);
    });
  };

  render() {
    const { children, className, creatable, multiple, name, value } = this.props;
    const { display, displayedOptions, open } = this.state;

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
            onDeselect={this.handleDeselect}
            onOpen={this.handleOpen}
            value={value}
          />
          <SelectFieldOptions
            creatable={creatable}
            display={display}
            displayedOptions={displayedOptions}
            multiple={multiple}
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
