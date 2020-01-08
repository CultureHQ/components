export type FormFieldError = string | null;

export type SelectValue = string;

export type SelectOption = {
  label: string;
  value: SelectValue;
};

export type SelectFieldPassedProps = {
  creatable: boolean;
  disabled: boolean | undefined;
  display: string;
  filteredOptions: SelectOption[];
  inputRef: React.RefObject<HTMLInputElement>;
  multiple: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onDeselect: (value: SelectValue) => void;
  onOpen: () => void;
  onSelect: (value: SelectValue) => void;
  open: boolean;
  options: SelectOption[];
  placeholder: string;
  value: null | SelectValue | SelectValue[];
};
