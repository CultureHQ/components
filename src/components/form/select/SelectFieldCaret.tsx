import * as React from "react";

import classnames from "../../../classnames";

type SelectFieldCaretProps = {
  open: boolean;
};

const SelectFieldCaret = ({ open }: SelectFieldCaretProps) => (
  <div className={classnames("chq-ffd--sl--caret", { "chq-ffd--sl--caret-flip": open })} />
);

export default SelectFieldCaret;
