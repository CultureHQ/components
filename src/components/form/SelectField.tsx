import * as React from "react";

import classnames from "../../classnames";
import SelectFieldSingle from "./select/SelectFieldSingle";
import SelectFieldMulti from "./select/SelectFieldMulti";
import { withForm } from "./Form";

type SelectFieldCommonProps = {
  children: React.ReactNode;
  className?: string;
};

type SelectFieldProps = SelectFieldCommonProps & (
  ({ multiple?: false } & React.ComponentProps<typeof SelectFieldSingle>)
  | ({ multiple: true } & React.ComponentProps<typeof SelectFieldMulti>)
);

const SelectField = ({ children, className, multiple, ...props }: SelectFieldProps) => (
  <label className={classnames("chq-ffd", className)} htmlFor={props.name}>
    <span className="chq-ffd--lb">{children}</span>
    {multiple ? <SelectFieldMulti {...props} /> : <SelectFieldSingle {...props} />}
  </label>
);

export default withForm(SelectField);
