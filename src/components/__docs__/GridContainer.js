import React, { useEffect, useState } from "react";

import Grid from "../Grid";

const breakpoints = [[1400, "xl"], [1200, "lg"], [992, "md"], [768, "sm"]];

const getSize = width => {
  const matched = breakpoints.find(breakpoint => width >= breakpoint[0]);
  return matched ? matched[1] : "xs";
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
      <Grid spacing={8}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <Grid.Item key={item} {...smallSizes}>
            <div className="chq-grid-size">{smallSizes[size]}</div>
          </Grid.Item>
        ))}
      </Grid>
      <Grid spacing={8}>
        {[1, 2, 3].map(item => (
          <Grid.Item key={item} {...largeSizes}>
            <div className="chq-grid-size">{largeSizes[size]}</div>
          </Grid.Item>
        ))}
      </Grid>
      <Grid spacing={8}>
        <Grid.Item xs={false} md={1}>
          <div className="chq-grid-size">
            {({ md: 1, lg: 1, xl: 1 }[size])}
          </div>
        </Grid.Item>
        <Grid.Item xs={6} md={5}>
          <div className="chq-grid-size">
            {({ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }[size])}
          </div>
        </Grid.Item>
        <Grid.Item xs={6}>
          <div className="chq-grid-size">
            6
          </div>
        </Grid.Item>
      </Grid>
    </>
  );
};

export default GridContainer;
