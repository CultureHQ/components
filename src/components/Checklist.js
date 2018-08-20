import React, { Fragment } from "react";
import classnames from "classnames";

import Checkmark from "./Checkmark";

const Checklist = ({ children, className }) => (
  <dl className={classnames(className, "chq-chl")}>
    {children}
  </dl>
);

const ChecklistItem = ({ children, checked }) => (
  <Fragment>
    <dt><Checkmark checked={checked} /></dt>
    <dd>{children}</dd>
  </Fragment>
);

Object.assign(Checklist, {
  Item: ChecklistItem
});

export default Checklist;
