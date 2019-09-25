import React, { useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";

import { Grid } from "../src/components";
import { GridSize } from "../src/components/Grid";

const breakpoints: { size: number; name: GridSize }[] = [
  { size: 1400, name: "xl" },
  { size: 1200, name: "lg" },
  { size: 992, name: "md" },
  { size: 768, name: "sm" }
];

const getSize = (width: number): GridSize => {
  const matched = breakpoints.find(breakpoint => width >= breakpoint.size);
  return matched ? matched.name : "xs";
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
  textAlign: "center" as const
};

const Container = () => {
  const [size, setSize] = useState<GridSize>(getSize(window.innerWidth));

  useEffect(() => {
    const onResize = (event: Event) => {
      if (event.currentTarget instanceof Window) {
        setSize(getSize(event.currentTarget.innerWidth));
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <>
      <Grid>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <Grid.Item key={item} {...smallSizes}>
            <div style={style}>{smallSizes[size]}</div>
          </Grid.Item>
        ))}
      </Grid>
      <Grid>
        {[1, 2, 3].map(item => (
          <Grid.Item key={item} {...largeSizes}>
            <div style={style}>{largeSizes[size]}</div>
          </Grid.Item>
        ))}
        <Grid.Item xs={false} md={1}>
          <div style={style}>
            {({ xs: false, sm: false, md: 1, lg: 1, xl: 1 }[size])}
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
    </>
  );
};

storiesOf("Grid", module).add("default", () => <Container />);
