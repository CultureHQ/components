import React from "react";

import SelectFieldSingleValue from "./SelectFieldSingleValue";
import SelectFieldMultiValue from "./SelectFieldMultiValue";

const SelectFieldValue = ({ multiple, ...props }) => (
  multiple ? <SelectFieldMultiValue {...props} /> : <SelectFieldSingleValue {...props} />
);

export default SelectFieldValue;
