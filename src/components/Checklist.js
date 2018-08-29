import React from "react";

import classnames from "../classnames";

import Checkmark from "./Checkmark";

const Checklist = ({ children, className }) => (
  <div className={classnames("chq-chl", className)}>
    {children}
  </div>
);

Object.assign(Checklist, {
  Item: Checkmark
});

export default Checklist;
