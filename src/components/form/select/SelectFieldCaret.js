import React from "react";

import classnames from "../../../classnames";

const SelectFieldCaret = React.memo(({ open }) => (
  <div className={classnames("chq-ffd--sl--caret", { "chq-ffd--sl--caret-flip": open })} />
));

export default SelectFieldCaret;
