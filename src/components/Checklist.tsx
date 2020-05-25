import React from "react";

import classnames from "../classnames";

import Checkmark from "./Checkmark";

type ChecklistProps = {
  children: React.ReactNode;
  className?: string;
};

type ChecklistComponent = React.FC<ChecklistProps> & {
  Item: typeof Checkmark
};

const Checklist: ChecklistComponent = ({ children, className }) => (
  <div className={classnames("chq-chl", className)}>
    {children}
  </div>
);

Checklist.Item = Checkmark;

export default Checklist;
