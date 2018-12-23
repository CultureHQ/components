import React, { useEffect, useState } from "react";

import Grid from "../Grid";

const getSize = width => {
  if (width >= 1400) {
    return "xl";
  }
  if (width >= 1200) {
    return "lg";
  }
  if (width >= 992) {
    return "md";
  }
  if (width >= 768) {
    return "sm";
  }
  return "xs";
};

const smallSizes = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
const largeSizes = { xs: 12, sm: 12, md: 6, lg: 4, xl: 4 };

const GridContainer = () => {
  const [size, setSize] = useState(getSize(window.innerWidth));

  useEffect(() => {
    const onResize = event => (
      setSize(getSize(event.currentTarget.innerWidth))
    );

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <>
      <Grid>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <Grid.Item key={item} {...smallSizes}>
            {smallSizes[size]}
          </Grid.Item>
        ))}
      </Grid>
      <Grid>
        {[1, 2, 3].map(item => (
          <Grid.Item key={item} {...largeSizes}>
            {largeSizes[size]}
          </Grid.Item>
        ))}
      </Grid>
    </>
  );
};

export default GridContainer;
