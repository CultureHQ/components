import React, { useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";

import { Grid } from "../src/components";

const breakpoints = [[1400, "xl"], [1200, "lg"], [992, "md"], [768, "sm"]];

const getSize = width => {
  const matched = breakpoints.find(breakpoint => width >= breakpoint[0]);
  return matched ? matched[1] : "xs";
};

const smallSizes = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
const largeSizes = { xs: 12, sm: 12, md: 6, lg: 4, xl: 4 };

const style = {
  backgroundColor: "gray",
  borderRadius: "5px",
  color: "white",
  fontSize: "40px",
  height: "100px",
  padding: "0.5em",
  textAlign: "center"
};

const Container = () => {
  const [size, setSize] = useState(getSize(window.innerWidth));

  useEffect(() => {
    const onResize = event => (
      setSize(getSize(event.currentTarget.innerWidth))
    );

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <Grid>
      {[1, 2, 3, 4, 5, 6].map(item => (
        <Grid.Item key={item} {...smallSizes}>
          <div style={style}>{smallSizes[size]}</div>
        </Grid.Item>
      ))}
      {[1, 2, 3].map(item => (
        <Grid.Item key={item} {...largeSizes}>
          <div style={style}>{largeSizes[size]}</div>
        </Grid.Item>
      ))}
      <Grid.Item xs={false} md={1}>
        <div style={style}>
          {({ md: 1, lg: 1, xl: 1 }[size])}
        </div>
      </Grid.Item>
      <Grid.Item xs={6} md={5}>
        <div style={style}>
          {({ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }[size])}
        </div>
      </Grid.Item>
      <Grid.Item xs={6}>
        <div style={style}>
          6
        </div>
      </Grid.Item>
    </Grid>
  );
};

storiesOf("Grid", module).add("default", () => <Container />);
