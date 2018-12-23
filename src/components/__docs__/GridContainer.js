import React, { useEffect, useState } from "react";

import Grid from "../Grid";

const getNumber = width => {
  if (width >= 1400) {
    return 2;
  }
  if (width >= 1200) {
    return 3;
  }
  if (width >= 992) {
    return 4;
  }
  if (width >= 768) {
    return 6;
  }
  return 12;
};

const GridContainer = () => {
  const [number, setNumber] = useState(getNumber(window.innerWidth));

  useEffect(() => {
    const onResize = event => (
      setNumber(getNumber(event.currentTarget.innerWidth))
    );

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <Grid>
      {[1, 2, 3, 4, 5, 6].map(item => (
        <Grid.Item key={item} xs={12} sm={6} md={4} lg={3} xl={2}>
          {number}
        </Grid.Item>
      ))}
    </Grid>
  );
};

export default GridContainer;
