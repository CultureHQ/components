import React, { Component } from "react";

import classnames from "../../classnames";
import Badge from "../buttons/Badge";
import PlainButton from "../buttons/PlainButton";
import DoorEffect from "../DoorEffect";

const appendValue = (value, selected) => (
  value ? [...value.filter(item => item !== selected), selected] : [selected]
);

const fuzzyFilter = matchable => {
  const terms = matchable.toLowerCase().split(" ").filter(Boolean);

  return ({ label }) => label.toLowerCase().split(" ").filter(Boolean).some(segment => (
    terms.some(term => segment.startsWith(term))
  ));
};

const SelectFieldCaret = React.memo(({ open }) => (
  <div className={classnames("chq-ffd--sl--caret", { "chq-ffd--sl--caret-flip": open })} />
));

const SelectFieldOption = React.memo(({ active, option: { label, value }, onDeselect, onSelect }) => {
  const onClick = () => (active ? onDeselect : onSelect)(value);
  const className = active ? "chq-ffd--sl--opt-act" : null;

  return (
    <PlainButton className={className} onClick={onClick}>
      {label}
    </PlainButton>
  );
});

const SelectFieldSingleValue = ({ display, inputRef, multiple, name, onChange, onDeselect, onOpen, open, value }) => (
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
    <SelectFieldCaret open={open} />
  </>
);

const SelectFieldMultiValueBadge = React.memo(({ value, onDeselect }) => {
  const onClick = event => {
    event.stopPropagation();
    onDeselect(value);
  };

  return <><Badge icon="close" onClick={onClick}>{value}</Badge>{" "}</>;
});

class SelectFieldMultiValue extends Component {
  handleKeyDown = event => {
    const { display, onDeselect, value } = this.props;

    if (!display && event.key === "Backspace" && value) {
      onDeselect(value[value.length - 1]);
    }
  };

  render() {
    const { display, inputRef, multiple, name, onChange, onDeselect, onOpen, open, value } = this.props;

    return (
      <div role="button" onClick={onOpen} className={classnames("chq-ffd--ctrl", { "chq-ffd--ctrl-fc": open })}>
        <input type="hidden" id={name} name={name} value={value} />
        {value && value.map(item => (
          <SelectFieldMultiValueBadge key={item} value={item} onDeselect={onDeselect} />
        ))}
        <input
          type="text"
          className="chq-ffd--sl--match"
          ref={inputRef}
          onChange={onChange}
          onKeyDown={this.handleKeyDown}
          value={display}
        />
        <SelectFieldCaret open={open} />
      </div>
    );
  }
};

const SelectFieldValue = ({ multiple, ...props }) => (
  multiple ? <SelectFieldMultiValue {...props} /> : <SelectFieldSingleValue {...props} />
);

const SelectFieldOptions = ({ creatable, display, filteredOptions, multiple, onDeselect, onSelect, open, value }) => {
  const createOption = multiple ? !value.includes(display) : (display !== value);

  return (
    <DoorEffect className="chq-ffd--sl--opts" open={open}>
      {creatable && (display.length > 0) && createOption && (
        <SelectFieldOption
          key={display}
          option={{ label: `Create option: ${display}`, value: display }}
          onSelect={onSelect}
        />
      )}
      {filteredOptions.map(option => (
        <SelectFieldOption
          key={option.value}
          option={option}
          onDeselect={onDeselect}
          onSelect={onSelect}
          active={multiple ? value.includes(option.value) : option.value === value}
        />
      ))}
      {!creatable && (filteredOptions.length === 0) && createOption && (
        <p>No results found.</p>
      )}
    </DoorEffect>
  );
};

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
    window.addEventListener("keydown", this.handleWindowKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
    window.removeEventListener("keydown", this.handleWindowKeyDown);
  }

  handleWindowClick = event => {
    const { options, value } = this.props;
    const { open } = this.state;

    if (open && !this.selectRef.current.contains(event.target)) {
      this.selectValue(value, true);
    }
  };

  handleWindowKeyDown = event => {
    const { open } = this.state;

    if (open && (event.key === "Escape") && this.selectRef.current.contains(event.target)) {
      this.setState({ open: false });
    }
  };

  handleSelect = selected => {
    const { multiple, value } = this.props;
    const nextValue = multiple ? appendValue(value, selected) : selected;

    this.selectValue(nextValue, !multiple);
    this.propagateValue(nextValue);
  };

  handleDeselect = deselected => {
    const { multiple, value } = this.props;
    const nextValue = multiple ? value.filter(item => item !== deselected) : "";

    this.selectValue(nextValue, !multiple);
    this.propagateValue(nextValue);
  };

  handleChange = event => {
    const { multiple, options, value } = this.props;
    const { display } = this.state;

    this.setState({
      display: ((!multiple && value === display) ? event.nativeEvent.data : event.target.value) || "",
      filteredOptions: options.filter(fuzzyFilter(display))
    });
  };

  handleOpen = () => {
    const { multiple } = this.props;

    if (multiple) {
      this.inputRef.current.focus();
    }

    this.setState({ open: true });
  };

  propagateValue = value => {
    const { name, onChange, onFormChange } = this.props;

    onChange(value);
    onFormChange(name, value);
  };

  selectValue = (value, shouldClose) => {
    const { multiple, options } = this.props;
    const effects = shouldClose ? { open: false } : {}

    this.setState({ display: multiple ? "" : value, ...effects, filteredOptions: options });
  };

  render() {
    const { children, className, creatable, multiple, name, options, value } = this.props;
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
