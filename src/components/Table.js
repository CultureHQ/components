import React from "react";

import classnames from "../classnames";

const Table = ({ className, children }) => (
  <table className={classnames("chq-tbl", className)}>{children}</table>
);

export default Table;
