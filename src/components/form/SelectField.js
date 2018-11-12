import React, { Component } from "react";

import classnames from "../../classnames";
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

class SelectField extends Component {
  static defaultProps = {
    autoFocus: false,
    creatable: false,
    onChange: () => {},
    onFormChange: () => {}
  };

  inputRef = React.createRef();

  selectRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      display: props.value,
      displayedOptions: props.options,
      open: false
    };
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.buttonRef.current.focus();
    }

    window.addEventListener("click", this.handleWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
  }

  handleWindowClick = event => {
    const { open } = this.state;

    if (open && !this.selectRef.current.contains(event.target)) {
      this.setState({ open: false });
    }
  };

  handleClick = value => {
    const { name, options, onChange, onFormChange } = this.props;

    this.setState({ display: value, displayedOptions: options, open: false });

    onChange(value);
    onFormChange(name, value);
  };

  handleChange = event => {
    const { options, value } = this.props;
    const { display } = this.state;

    const nextDisplay = value === display ? (event.nativeEvent.data || "") : event.target.value;
    const match = fuzzyMatch(nextDisplay);

    this.setState({
      display: nextDisplay,
      displayedOptions: options.filter(({ label }) => match(label))
    });
  };

  handleToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    const {
      autoFocus, children, className, onChange, onFormChange,
      onError, name, options = [], required, submitted, value, ...props
    } = this.props;

    const { display, displayedOptions, open } = this.state;

    return (
      <label className={classnames("chq-ffd", className)} htmlFor={name}>
        <span className="chq-ffd--lb">{children}</span>
        <div ref={this.selectRef} className="chq-ffd--sl">
          <input type="hidden" id={name} name={name} value={value} />
          <input
            type="text"
            ref={this.inputRef}
            className="chq-ffd--sl--tog"
            onClick={this.handleToggle}
            onChange={this.handleChange}
            value={display}
          />
          <div className="chq-ffd--sl--ct" />
          <DoorEffect className="chq-ffd--sl--opts" open={open}>
            {displayedOptions.map(option => (
              <SelectFieldOption
                key={option.value}
                option={option}
                onClick={this.handleClick}
                active={option.value === value}
              />
            ))}
            {(displayedOptions.length === 0) && (display !== value) && (
              <p>No results found.</p>
            )}
          </DoorEffect>
        </div>
      </label>
    );
  }
}

export default SelectField;
