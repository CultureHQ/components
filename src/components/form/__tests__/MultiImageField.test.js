import React from "react";
import { mount } from "enzyme";

import MultiImageField, { Transport } from "../MultiImageField";
import image from "../../__tests__/__mocks__/image";

test("has no violations", async () => {
  await expect(<MultiImageField name="image" />).toHaveNoViolations();
});

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const files = [{ name: "Some file" }, { name: "Some other file" }];

  const component = mount(
    <MultiImageField name="images" onChange={onChange} />
  );

  component.find("input").simulate("change", { target: { files } });

  expect(onChange).toHaveBeenCalledWith(files);
  component.unmount();
});

test("responds to the open edit callback", () => {
  const component = mount(<MultiImageField name="images" />);

  component.find("MultiImageField").instance().setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image)]
  });
  component.update();

  const findEdit = node => node.text() && node.text().trim() === "Edit";
  component.find("button").findWhere(findEdit).simulate("click");

  expect(component.find("ModalDialog")).toHaveLength(1);
});

test("responds to edit callback", () => {
  const onChange = jest.fn();
  const component = mount(<MultiImageField name="images" onChange={onChange} />);

  component.find("MultiImageField").instance().setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image), new Transport({ name: "foobar" })]
  });
  component.update();

  component.find("MultiImageField").instance().handleImageEdited(image);
  expect(onChange).toHaveBeenLastCalledWith([image, { name: "foobar" }]);

  component.unmount();
});

test("responds to failure callback", () => {
  const onChange = jest.fn();
  const component = mount(<MultiImageField name="images" onChange={onChange} />);

  component.find("MultiImageField").instance().setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image)]
  });
  component.update();

  component.find("MultiImageField").instance().handleImageFailure();
  expect(onChange).toHaveBeenLastCalledWith([]);

  component.unmount();
});

test("responds to the remove callback", () => {
  const onChange = jest.fn();
  const component = mount(<MultiImageField name="images" onChange={onChange} />);

  component.find("MultiImageField").instance().setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image)]
  });
  component.update();

  const findEdit = node => node.text() && node.text().trim() === "Remove";
  component.find("button").findWhere(findEdit).simulate("click");

  expect(onChange).toHaveBeenLastCalledWith([]);

  component.unmount();
});

test("handles closing the modal", () => {
  const component = mount(<MultiImageField name="images" />);

  component.find("MultiImageField").instance().setState({ editorOpen: true });
  component.find("MultiImageField").instance().handleClose();

  expect(component.find("MultiImageField").instance().state.editorOpen).toBe(false);
});

test("handles clicking the file field", () => {
  const component = mount(<MultiImageField name="images" />);

  component.find("MultiImageField").instance().handleClick();

  expect(component.find("input").instance().value).toBe("");
});

test("accepts autoFocus", () => {
  mount(<MultiImageField name="images" autoFocus />);

  expect(document.activeElement.id).toEqual("images");
});
