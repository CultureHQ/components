import * as React from "react";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

import Checkmark from "./Checkmark";

const Checklist = ({ children, className }: ContainerProps) => (
  <div className={classnames("chq-chl", className)}>
    {children}
  </div>
);

Checklist.Item = Checkmark;

export default Checklist;
