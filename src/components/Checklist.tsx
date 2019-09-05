import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../types";

import Checkmark from "./Checkmark";

const Checklist = ({ children, className }: HTMLContainerProps) => (
  <div className={classnames("chq-chl", className)}>
    {children}
  </div>
);

Checklist.Item = Checkmark;

export default Checklist;
