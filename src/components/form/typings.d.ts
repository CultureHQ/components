import { IconName } from "../Icon";

export type FormFieldError = string | null;

export type SelectValueWithCategory = { value: string; category: string };

export type SelectValue = string;

export type SelectOption = {
  label: string;
  value: SelectValue;
  icon?: IconName;
  category?: string;
  categoryIcon?: string;
};

export type SelectFieldPassedProps = {
  allowEmpty: boolean | undefined;
  creatable: boolean;
  disabled: boolean | undefined;
  display: string;
  filteredOptions: SelectOption[];
  fixedValue: boolean;
  imageIconPath: string | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  multiple: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onDeselect: (value: SelectValue, category: string) => void;
  onOpen: () => void;
  onSelected: (() => void) | undefined;
  onUnselected: (() => void) | undefined;
  onSelect: (value: SelectValue, category: string) => void;
  open: boolean;
  options: SelectOption[];
  placeholder: string;
  resultWithCategory: boolean;
  value: null | SelectValue | SelectValue[];
};
