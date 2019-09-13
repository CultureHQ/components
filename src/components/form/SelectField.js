import React from "react";

import classnames from "../../classnames";
import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import { withForm } from "./Form";

const SelectField = ({ children = null, className = null, multiple = false, ...props }) => (
  <label className={classnames("chq-ffd", className)} htmlFor={props.name}>
    <span className="chq-ffd--lb">{children}</span>
    {multiple ? <SelectFieldMulti {...props} /> : <SelectFieldSingle {...props} />}
  </label>
);

export default withForm(SelectField);
