import * as React from "react";

import SelectFieldSingleValue from "./SelectFieldSingleValue";
import SelectFieldMultiValue from "./SelectFieldMultiValue";
import { SelectFieldPassedProps } from "../typings";

type SingleProps = React.ComponentProps<typeof SelectFieldSingleValue>;
type MultiProps = React.ComponentProps<typeof SelectFieldMultiValue>;

type SelectFieldValueProps = Omit<SingleProps, "value"> & Omit<MultiProps, "value"> & Pick<SelectFieldPassedProps, "multiple" | "value">;

const SelectFieldValue = ({ multiple, value, ...props }: SelectFieldValueProps) => {
  if (multiple) {
    return <SelectFieldMultiValue {...props} value={value as MultiProps["value"]} />;
  }

  return <SelectFieldSingleValue {...props} value={value as SingleProps["value"]} />;
};

export default SelectFieldValue;
