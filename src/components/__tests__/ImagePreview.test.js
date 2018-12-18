import React from "react";
import { mount } from "enzyme";

import ImagePreview from "../ImagePreview";
import * as readImage from "../../utils/readImage";

test("reads image and loads it", async () => {
  readImage.default = jest.fn(() => Promise.resolve({
    src: "culturehq.png",
    styles: { height: "200px" }
  }));

  const component = mount(<ImagePreview preview="culture.png" />);
  expect(component.find("img")).toHaveLength(0);

  await component.instance().enqueueLoad();
  component.update();

  expect(component.find("img")).toHaveLength(1);
  expect(component.find("img").prop("style")).toHaveProperty("height", "200px");
});

test("does not attempt to set state when unmounted while waiting", async () => {
  readImage.default = jest.fn(() => new Promise(resolve => (
    setTimeout(() => resolve({ src: "culturehq.png", styles: { height: "200px" } }), 200)
  )));

  const component = mount(<ImagePreview preview="culture.png" />);
  expect(component.find("img")).toHaveLength(0);

  const promise = component.instance().enqueueLoad();
  component.unmount();
  await promise;
});

test("references parent height if already loaded", () => {
  const component = mount(<div><ImagePreview preview="culturehq.png" /></div>);

  component.find(ImagePreview).instance().setState({ src: "culturehq.png" });
  component.update();

  component.find(ImagePreview).instance().enqueueLoad();
});
