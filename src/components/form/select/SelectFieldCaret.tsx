import * as React from "react";

import classnames from "../../../classnames";
import { SelectFieldPassedProps } from "../typings";

type SelectFieldCaretProps = Pick<SelectFieldPassedProps, "open">;

const SelectFieldCaret = ({ open }: SelectFieldCaretProps) => (
  <div className={classnames("chq-ffd--sl--caret", { "chq-ffd--sl--caret-flip": open })} />
);

export default SelectFieldCaret;
