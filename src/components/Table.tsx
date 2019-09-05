import * as React from "react";

import classnames from "../classnames";
import { HTMLContainerProps } from "../typings";

const Table = ({ children, className }: HTMLContainerProps) => (
  <table className={classnames("chq-tbl", className)}>{children}</table>
);

export default Table;
