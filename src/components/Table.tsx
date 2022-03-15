import React from "react";

import classnames from "../classnames";

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

const Table: React.FC<TableProps> = ({ children, className }) => (
  <table className={classnames("chq-tbl", className)}>{children}</table>
);

Table.defaultProps = {
  className: undefined
};

export default Table;
