import * as React from "react";
import { render } from "@testing-library/react";

import Grid, { GridSize } from "../Grid";

test("has no violations", () => {
  const jsx = (
    <Grid>
      <Grid.Item xs={3}>
        Left panel
      </Grid.Item>
      <Grid.Item xs={6}>
        Center content
      </Grid.Item>
      <Grid.Item xs={3}>
        Right panel
      </Grid.Item>
    </Grid>
  );

  return expect(jsx).toHaveNoViolations();
});

test("creates main container", () => {
  const { container } = render(
    <Grid className="grid">Grid!</Grid>
  );

  expect(container.querySelector(".grid")).toBeTruthy();
});

test("applies classes", () => {
  const sizes: { [K in GridSize]: number } = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
  const { container } = render(<Grid><Grid.Item {...sizes} /></Grid>);

  Object.keys(sizes).forEach(key => {
    const size = key as GridSize;
    const className = `.chq-grid--item.chq-grid--${size}-${sizes[size]}`;
    expect(container.querySelector(className)).toBeTruthy();
  });
});
