import React, { useState } from "react";

import { Pagination } from "../../src";

const PaginationContainer = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onClick={setCurrentPage}
    />
  );
};

export default PaginationContainer;
