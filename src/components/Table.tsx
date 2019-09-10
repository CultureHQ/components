import * as React from "react";

import classnames from "../classnames";
import { ContainerProps } from "../typings";

const Table = ({ children, className }: ContainerProps) => (
  <table className={classnames("chq-tbl", className)}>{children}</table>
);

export default Table;
