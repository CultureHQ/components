import React from "react";
import { mount } from "enzyme";

import MultiImageField, { Transport } from "../MultiImageField";
import image from "../../__tests__/__mocks__/image";

test("has no violations", async () => {
  await expect(<MultiImageField name="image" />).toHaveNoViolations();
});

test("calls up to callbacks if they are provided", () => {
  const files = [{ name: "Some file" }, { name: "Some other file" }];

  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <MultiImageField
      name="images"
      onChange={changeValue => Object.assign(response, { changeValue })}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.find("input").simulate("change", { target: { files } });

  expect(response).toEqual({
    changeValue: files,
    formChangeName: "images",
    formChangeValue: files
  });

  component.unmount();
});

test("does not call callbacks when they are not provided", () => {
  const component = mount(<MultiImageField name="image" />);

  component.find("input").simulate("change", { target: { files: ["Some file"] } });

  component.unmount();
});

test("responds to the open edit callback", () => {
  const component = mount(<MultiImageField name="images" />);
  component.setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image)]
  });

  const findEdit = node => node.text() && node.text().trim() === "Edit";
  component.find("button").findWhere(findEdit).simulate("click");

  expect(component.find("ModalDialog")).toHaveLength(1);
});

test("responds to edit callback", () => {
  let response = null;
  const onChange = value => {
    response = value;
  };

  const component = mount(<MultiImageField name="images" onChange={onChange} />);
  component.setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image)]
  });

  component.instance().handleImageEdited(image);
  expect(response).toEqual([image]);

  component.unmount();
});

test("responds to failure callback", () => {
  let response = null;
  const onChange = value => {
    response = value;
  };

  const component = mount(<MultiImageField name="images" onChange={onChange} />);
  component.setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image)]
  });

  component.instance().handleImageFailure();
  expect(response).toEqual([]);

  component.unmount();
});

test("responds to the remove callback", () => {
  let response = null;
  const onChange = value => {
    response = value;
  };

  const component = mount(<MultiImageField name="images" onChange={onChange} />);
  component.setState({
    currentTransport: new Transport(image),
    transports: [new Transport(image)]
  });

  const findEdit = node => node.text() && node.text().trim() === "Remove";
  component.find("button").findWhere(findEdit).simulate("click");

  expect(response).toEqual([]);

  component.unmount();
});

test("handles closing the modal", () => {
  const component = mount(<MultiImageField name="images" />);

  component.setState({ editorOpen: true });
  component.instance().handleClose();

  expect(component.state().editorOpen).toBe(false);
});
