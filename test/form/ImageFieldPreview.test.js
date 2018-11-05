import React from "react";
import { mount } from "enzyme";

import ImageFieldPreview from "../../src/components/form/ImageFieldPreview";
import * as readImage from "../../src/utils/read-image";

test("reads image and loads it", async () => {
  readImage.default = jest.fn(() => Promise.resolve({
    src: "culturehq.png",
    styles: { height: "200px" }
  }));

  const component = mount(<ImageFieldPreview preview="culture.png" />);
  expect(component.find("img")).toHaveLength(0);

  await component.instance().enqueueLoad();
  component.update();

  expect(component.find("img")).toHaveLength(1);
  expect(component.find("img").prop("style")).toHaveProperty("height", "200px");
});
