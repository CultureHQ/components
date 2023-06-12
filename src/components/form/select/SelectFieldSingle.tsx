import React from "react";

import FormError from "../FormError";
import { FormState } from "../Form";
import { FormFieldError, SelectOption, SelectValue } from "../typings";

import SelectFieldSingleValue from "./SelectFieldSingleValue";
import SelectFieldOptions from "./SelectFieldOptions";
import fuzzyFilter from "./fuzzyFilter";

type SelectFieldSingleProps = Omit<FormState, "disabled"> & {
  allowEmpty?: boolean;
  allWordsMatch?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
  childIsLabel: boolean;
  clearValueOnOpen: boolean;
  creatable: boolean;
  creatableLabel: string;
  createClickNeeded: boolean;
  disabled?: boolean;
  imageIconPath?: string;
  initialDisplay?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  isDestroyable: boolean;
  name: string;
  fixedValue: boolean;
  onCloseAction?: () => void;
  onChange?: (value: null | SelectValue) => void;
  onTextChanged?: (value: string) => void;
  onFocus: () => void;
  onSelected?: () => void;
  onUnselected?: () => void;
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
  const { clearValueOnOpen } = props;

  let display = props.initialDisplay || "";

  if (normal !== undefined) {
    if (props.allowEmpty) {
      return `${normal}`;
    }

    const match = props.options.find(({ value }) => value === normal);
    if (match) {
      // This is because on the first load, I want to clean the value if you have a selected option
      display = clearValueOnOpen ? match.label : "";
    } else {
      display = normal as string;
    }
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

  componentDidMount(): void {
    window.addEventListener("click", this.handleWindowClick);
  }

  componentDidUpdate(prevProps: SelectFieldSingleProps): void {
    const { allWordsMatch, creatable, options, value } = this.props;
    const { display } = this.state;

    if (prevProps.options !== options) {
      this.setState(({ open }) => ({
        display: getDisplay(this.props),
        filteredOptions: open ? fuzzyFilter(options, display, allWordsMatch) : options
      }));
    } else if (prevProps.value !== value && (!creatable || !display)) {
      this.setState({ display: getDisplay(this.props) });
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener("click", this.handleWindowClick);

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  getValue = (): null | SelectValue => {
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

  handleWindowClick = (event: Event): void => {
    const { createClickNeeded, onCloseAction, selectRef, isDestroyable } = this.props;
    const { open, display } = this.state;
    const select = selectRef.current;

    if (open && select && event.target instanceof Element && !select.contains(event.target)) {
      if (createClickNeeded || display === "") {
        const value = this.getValue();
        this.selectValue(value);
        this.propagateValue(value);
      } else {
        this.selectValue(display);
        this.propagateValue(display);
      }
      if (onCloseAction) {
        onCloseAction();
      }
    } else if (isDestroyable && !open) {
      this.setState({ open: true });
    }
  };

  handleSelect = (selected: SelectValue): void => {
    const { onFocus } = this.props;

    onFocus();
    this.selectValue(selected);
    this.propagateValue(selected);
  };

  handleDeselect = (): void => {
    const { onFocus } = this.props;

    onFocus();
    this.selectValue(null);
    this.propagateValue(null);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { allWordsMatch, options, fixedValue, onTextChanged } = this.props;
    const { display } = this.state;

    const normal = this.getValue();
    const currentOption = (normal !== null && options.find(option => option.value === normal));

    let nextDisplay = event.target.value;
    nextDisplay = currentOption && currentOption.label === display
      ? (event.nativeEvent as any).data
      : nextDisplay;

    if (onTextChanged) {
      onTextChanged(nextDisplay);
    }

    if (!fixedValue) {
      this.setState({
        display: nextDisplay || "",
        filteredOptions: fuzzyFilter(options, nextDisplay, allWordsMatch),
        open: true
      });
    }
  };

  isAnOption = (props: SelectFieldSingleProps): boolean => {
    const normal = props.value || (props.values[props.name] as undefined | null | SelectValue);

    if (normal !== undefined) {
      const match = props.options.find(({ value }) => value === normal);
      return !!match;
    }

    return false;
  };

  handleOpen = (): void => {
    const { onSelected } = this.props;
    if (onSelected) {
      onSelected();
    }

    this.setState({ open: true });
    const { clearValueOnOpen, fixedValue } = this.props;

    if (!fixedValue && clearValueOnOpen) {
      this.setState({ display: "" });
    }
  };

  handleClose = (): void => {
    this.setState({ open: false, touched: true });
  };

  propagateValue = (value: null | SelectValue): void => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  selectValue = (nextValue: null | SelectValue): void => {
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
  render(): React.ReactElement {
    const {
      allowEmpty, ariaLabel, children, childIsLabel, creatable, creatableLabel, disabled,
      fixedValue, imageIconPath, inputRef, name, onError, options, placeholder, onCloseAction,
      onSelected, onUnselected, required, selectRef, submitted, validator
    } = this.props;

    const { display, filteredOptions, open, touched } = this.state;

    const normal = this.getValue();
    const classes = imageIconPath ? "chq-ffd--sl chq-ffd--sl--with-icon" : "chq-ffd--sl";

    return (
      <>
        <div ref={selectRef} className={classes}>
          <SelectFieldSingleValue
            ariaLabel={ariaLabel}
            childIsLabel={childIsLabel}
            disabled={disabled}
            display={display}
            fixedValue={fixedValue}
            imageIconPath={imageIconPath}
            inputRef={inputRef}
            name={name}
            onChange={this.handleChange}
            onClose={this.handleClose}
            onCloseAction={onCloseAction}
            onOpen={this.handleOpen}
            onSelected={onSelected}
            onUnselected={onUnselected}
            open={open}
            placeholder={placeholder}
            value={normal}
          />
          { children }
          <SelectFieldOptions
            allowEmpty={allowEmpty}
            creatable={creatable}
            creatableLabel={creatableLabel}
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
