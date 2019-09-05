import * as React from "react";

import classnames from "../classnames";

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

const Table = ({ children, className }: TableProps) => (
  <table className={classnames("chq-tbl", className)}>{children}</table>
);

export default Table;
