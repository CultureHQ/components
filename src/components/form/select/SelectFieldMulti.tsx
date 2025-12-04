import React from "react";

import FormError from "../FormError";
import { FormState } from "../Form";
import { FormFieldError, SelectOption, SelectValue, SelectValueWithCategory } from "../typings";

import SelectFieldMultiValue from "./SelectFieldMultiValue";
import SelectFieldOptions from "./SelectFieldOptions";
import fuzzyFilter from "./fuzzyFilter";

type SelectFieldMultiProps = Omit<FormState, "disabled"> & {
  autoFocus?: boolean;
  allowEmpty?: boolean;
  allWordsMatch?: boolean;
  ariaLabel?: string;
  creatable: boolean;
  creatableLabel: string;
  createClickNeeded: boolean;
  disabled?: boolean;
  imageIconPath?: string;
  initialDisplay?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  name: string;
  fixedValue: boolean;
  onCloseAction?: () => void;
  onChange?: (value: null | SelectValue[] | SelectValueWithCategory[]) => void;
  onTextChanged?: (value: string) => void;
  onFocus: () => void;
  onSelected?: () => void;
  onUnselected?: () => void;
  options: SelectOption[];
  placeholder: string;
  required: boolean;
  selectRef: React.RefObject<HTMLDivElement>;
  validator?: (value: null | SelectValue[]) => FormFieldError;
  value?: null | SelectValue[] | any[];
  removePlacholder: boolean;
};

type SelectFieldMultiState = {
  display: string;
  filteredOptions: SelectOption[];
  open: boolean;
  touched: boolean;
  placeholderIsVisible: boolean;
};

class SelectFieldMulti extends React.Component<SelectFieldMultiProps, SelectFieldMultiState> {
  private timeout: null | number;

  constructor(props: SelectFieldMultiProps) {
    super(props);
    this.state = {
      display: "",
      filteredOptions: props.options,
      open: false,
      touched: false,
      placeholderIsVisible: props.placeholder !== "" && !props.removePlacholder
    };

    this.timeout = null;
  }

  componentDidMount(): void {
    window.addEventListener("click", this.handleWindowClick);
  }

  componentDidUpdate(prevProps: SelectFieldMultiProps, prevState: SelectFieldMultiState): void {
    const { allWordsMatch, initialDisplay, options } = this.props;
    const { display, open, placeholderIsVisible, touched } = this.state;

    if (prevProps.options !== options) {
      this.setState({
        display: initialDisplay || "",
        filteredOptions: fuzzyFilter(options, display, allWordsMatch)
      });
    }

    if (!open && !prevState.open && !placeholderIsVisible) {
      if (touched) {
        this.inputFocusClass(false);
        const { autoFocus } = this.props;

        if (!autoFocus) {
          this.setState({
            placeholderIsVisible: true
          });
        } else {
          this.inputFocusClass(true);
        }
      }
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener("click", this.handleWindowClick);

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  getValue = (): null | SelectValue[] => {
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleWindowClick = (event: any): void => {
    const { createClickNeeded, onCloseAction, selectRef, onFocus } = this.props;
    if (event.target) {
      if (event.target.id === "sl-placeholder" || event.target.id === "create-field-option") {
        return;
      }
    }
    const { display, open } = this.state;
    const select = selectRef.current;
    const normal = this.getValue();

    if (open && select && event.target instanceof Element && !select.contains(event.target)) {
      if (createClickNeeded) {
        this.selectValue(this.getValue() as (null | SelectValue[]), true);
      } else if (display && display.length > 0) {
        let nextValue: any[] = [];
        nextValue = normal
          ? [...(normal as SelectValue[]).filter(item => item !== display), display]
          : [display];

        onFocus();
        this.selectValue(nextValue, false);
        this.propagateValue(nextValue);
      }

      if (onCloseAction) {
        onCloseAction();
      }
    }
  };

  handleSelect = (selected: SelectValue, category = ""): void => {
    const { onFocus } = this.props;

    const normal = this.getValue();

    let nextValue: any[] = [];
    if (category.length > 0) {
      nextValue = normal
        ? [...(normal as SelectValue[]).filter(item => item !== selected),
          { value: selected, category }]
        : [{ value: selected, category }];
    } else {
      nextValue = normal
        ? [...(normal as SelectValue[]).filter(item => item !== selected), selected]
        : [selected];
    }

    onFocus();
    this.selectValue(nextValue, false);
    this.propagateValue(nextValue);
  };

  handleDeselect = (deselected: SelectValue, category = ""): void => {
    const { onFocus } = this.props;
    const { placeholderIsVisible } = this.state;
    const normal = this.getValue();

    let nextValue: any = null;
    if (category.length > 0) {
      nextValue = normal
        ? (normal as SelectValue[]).filter((item: any) => (item.value !== deselected))
        : null;
    } else {
      nextValue = normal ? (normal as SelectValue[]).filter(item => item !== deselected) : null;
    }

    if (!placeholderIsVisible) {
      onFocus();
    }
    this.selectValue(nextValue, false);
    this.propagateValue(nextValue);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { allWordsMatch, onTextChanged, options } = this.props;
    const nextDisplay = event.target.value;

    if (onTextChanged) {
      onTextChanged(nextDisplay);
    }

    this.setState({
      display: nextDisplay || "",
      filteredOptions: fuzzyFilter(options, nextDisplay, allWordsMatch),
      open: true
    });
  };

  handleOpen = (): void => {
    const { onFocus } = this.props;

    onFocus();
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false, touched: true });
  };

  handleInputFocus = (): void => {
    const { placeholderIsVisible } = this.state;
    const { onSelected } = this.props;

    if (onSelected) {
      onSelected();
    }

    this.inputFocusClass(true);

    if (!placeholderIsVisible) return;
    this.inputFocusClass(true);
    this.setState(prev => ({ ...prev, placeholderIsVisible: false }));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleInputBlur = (event: any): void => {
    const { placeholderIsVisible } = this.state;
    const { onUnselected } = this.props;

    if (onUnselected) {
      onUnselected();
    }
    const shouldShowPlaceholder = !event.relatedTarget
    || (event.relatedTarget.id !== "select-field-option" && event.relatedTarget.id !== "option-tag"
    && event.relatedTarget.id !== "option-action" && event.relatedTarget.id !== "create-field-option");

    if (placeholderIsVisible === shouldShowPlaceholder) return;

    if (event.relatedTarget) {
      if (event.relatedTarget.id) {
        if (!(event.relatedTarget.id === "select-field-option" || event.relatedTarget.id === "option-tag" || event.relatedTarget.id === "create-field-option")) {
          this.inputFocusClass(false);
          this.setState(prev => ({ ...prev,
            placeholderIsVisible: true }));
        }
      } else {
        this.inputFocusClass(false);
        this.setState(prev => ({ ...prev,
          placeholderIsVisible: true }));
      }
    } else {
      this.inputFocusClass(false);
      this.setState(prev => ({ ...prev,
        placeholderIsVisible: true }));
    }
  };

  inputFocusClass = (focused: boolean): void => {
    const { inputRef } = this.props;
    if (inputRef.current) {
      if (focused) {
        inputRef.current.classList.add("chq-ffd--sl--match--focus");
      } else {
        inputRef.current.classList.remove("chq-ffd--sl--match--focus");
      }
    }
  }

  propagateValue = (value: null | SelectValue[] | SelectValueWithCategory[]): void => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    onFormChange(name, value);
  };

  selectValue = (nextValue: null | SelectValue[] | SelectValueWithCategory[],
    shouldClose: boolean): void => {
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
  render(): React.ReactElement {
    const {
      allowEmpty, ariaLabel, creatable, creatableLabel, disabled, imageIconPath, inputRef, name,
      onError, options, placeholder, onSelected, onUnselected, required, selectRef,
      submitted, validator, removePlacholder
    } = this.props;

    const { display, filteredOptions, open, touched, placeholderIsVisible } = this.state;
    const normal = this.getValue();

    return (
      <>
        <div ref={selectRef} className="chq-ffd--sl">
          <SelectFieldMultiValue
            ariaLabel={ariaLabel}
            disabled={disabled}
            display={display}
            imageIconPath={imageIconPath}
            inputRef={inputRef}
            name={name}
            onChange={this.handleChange}
            onClose={this.handleClose}
            onDeselect={this.handleDeselect}
            onSelected={onSelected}
            onUnselected={onUnselected}
            onOpen={this.handleOpen}
            open={open}
            options={options}
            placeholder={placeholder}
            value={normal}
            removePlacholder={removePlacholder}
            placeholderIsVisible={placeholderIsVisible}
            onInpuFocus={this.handleInputFocus}
            onInputBlur={this.handleInputBlur}
          />
          <SelectFieldOptions
            allowEmpty={allowEmpty}
            creatable={creatable}
            creatableLabel={creatableLabel}
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
