import React, { useCallback, useState } from "react";

import { Button, Loader } from "../../src";

const LoaderContainer = () => {
  const [loading, setLoading] = useState(true);

  const onClick = useCallback(() => setLoading(state => !state));

  return (
    <>
      <Button onClick={onClick}>
        {loading ? "Load" : "Unload"} content
      </Button>
      <Loader loading={loading}>
        <p>Content loaded!</p>
      </Loader>
    </>
  );
};

export default LoaderContainer;
