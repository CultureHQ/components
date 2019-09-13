import * as React from "react";

import classnames from "../../classnames";
import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import { withForm } from "./Form";

const useAutoFocus = <T extends HTMLElement>(autoFocus: boolean, elementRef: React.RefObject<T>) => {
  const onFocus = React.useCallback(
    () => {
      const element = elementRef.current;

      if (element) {
        element.focus();
      }
    },
    [elementRef]
  );

  React.useEffect(
    () => {
      if (autoFocus) {
        onFocus();
      }
    },
    [autoFocus, onFocus]
  );

  return onFocus;
};

type SelectFieldCommonProps = {
  children: React.ReactNode;
  className?: string;
};

type SelectFieldProps = SelectFieldCommonProps & (
  ({ multiple?: false } & React.ComponentProps<typeof SelectFieldSingle>)
  | ({ multiple: true } & React.ComponentProps<typeof SelectFieldMulti>)
);

const SelectField = ({
  autoFocus = false,
  children,
  className,
  creatable = false,
  multiple = false,
  name,
  placeholder = "",
  required = false,
  ...props
}: SelectFieldProps) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const onFocus = useAutoFocus(autoFocus, inputRef);

  const passed = {
    ...props,
    autoFocus,
    creatable,
    inputRef,
    name,
    onFocus,
    placeholder,
    required,
    selectRef: React.createRef<HTMLDivElement>()
  };

  return (
    <label className={classnames("chq-ffd", className)} htmlFor={name}>
      <span className="chq-ffd--lb">{children}</span>
      {multiple ? <SelectFieldMulti {...passed} /> : <SelectFieldSingle {...passed} />}
    </label>
  );
};

export default withForm(SelectField);
