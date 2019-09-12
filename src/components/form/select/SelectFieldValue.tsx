import * as React from "react";

import SelectFieldSingleValue from "./SelectFieldSingleValue";
import SelectFieldMultiValue from "./SelectFieldMultiValue";

type SingleProps = React.ComponentProps<typeof SelectFieldSingleValue>;
type MultiProps = React.ComponentProps<typeof SelectFieldMultiValue>;

type SingleValue = SingleProps["value"];
type MultiValue = MultiProps["value"];

type SelectFieldValueProps = Omit<SingleProps, "value"> & Omit<MultiProps, "value"> & {
  multiple: boolean;
  value: SingleValue | MultiValue;
};

const SelectFieldValue = ({ multiple, value, ...props }: SelectFieldValueProps) => {
  if (multiple) {
    return <SelectFieldMultiValue {...props} value={value as MultiValue} />;
  }

  return <SelectFieldSingleValue {...props} value={value as SingleValue} />;
};

export default SelectFieldValue;
