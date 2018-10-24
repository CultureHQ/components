import React from "react";
import { mount } from "enzyme";

import { ImageEditor } from "../src";
import image from "./mocks/image";

const mountEditor = async (onEdit = null) => {
  const component = mount(<ImageEditor image={image} onEdit={onEdit} />);

  await component.instance().componentDidMount();
  component.instance().cropper.replace(image);

  Object.defineProperty(component.instance().cropper.image, "naturalWidth", { value: 128 });
  Object.defineProperty(component.instance().cropper.image, "naturalHeight", { value: 128 });
  component.instance().cropper.image.onload();

  component.clickControl = label => {
    const button = component.find("PlainButton").findWhere(node => (
      node.type() === "button" && node.props()["aria-label"] === label
    ));

    button.simulate("click");
  };

  component.clickSave = () => {
    const button = component.find("Button").findWhere(node => (
      node.type() === "button" && node.text().trim() === "Save"
    ));

    button.simulate("click");
  };

  return component;
};

test("has no violations", async () => {
  await expect(<ImageEditor image={image} />).toHaveNoViolations();
});

test("can click rotate left to modify image", async () => {
  const component = await mountEditor();

  component.clickControl("Rotate left");
  expect(component.instance().cropper.imageData.rotate).toEqual(-45);

  component.unmount();
});

test("can click rotate right to modify image", async () => {
  const component = await mountEditor();

  component.clickControl("Rotate right");
  expect(component.instance().cropper.imageData.rotate).toEqual(45);

  component.unmount();
});

test("can click zoom in to modify image", async () => {
  const component = await mountEditor();
  const { top } = component.instance().cropper.canvasData;

  component.clickControl("Zoom in");
  expect(component.instance().cropper.canvasData.top).toBeLessThan(top);
});

test("can click zoom out to modify image", async () => {
  const component = await mountEditor();
  const { top } = component.instance().cropper.canvasData;

  component.clickControl("Zoom out");
  expect(component.instance().cropper.canvasData.top).toBeGreaterThan(top);
});

test("can click save to save", async () => {
  let response = null;
  const onEdit = edited => {
    response = edited;
  };

  const component = await mountEditor(onEdit);

  component.instance().cropper.getCroppedCanvas = () => ({
    toDataURL() {
      return image;
    }
  });

  component.clickSave();

  expect(response).not.toBe(null);
});

test("does not attempt to set state if already unmounted", async () => {
  const component = await mountEditor();

  component.instance().componentDidMount();
  component.unmount();
});
