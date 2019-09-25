import * as React from "react";

import classnames from "../classnames";

import Checkmark from "./Checkmark";

type ChecklistProps = {
  children: React.ReactNode;
  className?: string;
};

const Checklist = ({ children, className }: ChecklistProps) => (
  <div className={classnames("chq-chl", className)}>
    {children}
  </div>
);

Checklist.Item = Checkmark;

export default Checklist;
