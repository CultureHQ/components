import React from "react";
import { shallow } from "enzyme";

import Thumbnail from "../src/components/Thumbnail";

test("renders without crashing", () => {
  const component = shallow(<Thumbnail image="https://robohash.org/1" />);

  expect(component.type()).toEqual("div");
});
