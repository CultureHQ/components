import React, { useState } from "react";

import { Button, Loader } from "../../src";

const LoaderContainer = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Button onClick={() => setLoading(!loading)}>
        {loading ? "Load" : "Unload"} content
      </Button>
      <Loader loading={loading}>
        <p>Content loaded!</p>
      </Loader>
    </>
  );
};

export default LoaderContainer;
