import React from "react";
import { mount } from "enzyme";

import Grid from "../Grid";

const makeHasClass = component => (size, cols) => (
  component.find(".chq-grid--item").hasClass(`chq-grid--${size}-${cols}`)
);

test("creates main container", () => {
  const component = mount(<Grid className="grid" />);

  expect(component.find(".chq-grid").hasClass("grid")).toBe(true);
});

test("applies classes", () => {
  const sizes = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
  const hasClass = makeHasClass(mount(<Grid><Grid.Item {...sizes} /></Grid>));

  Object.keys(sizes).forEach(size => {
    expect(hasClass(size, sizes[size])).toBe(true);
  });
});
