import React from "react";
import { mount } from "enzyme";

import { ImageField } from "../../src";
import image from "../mocks/image";

test("calls up to callbacks if they are provided", () => {
  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <ImageField
      name="image"
      onChange={changeValue => Object.assign(response, { changeValue })}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.find("input").simulate("change", {
    target: { files: ["Some file"] }
  });

  expect(response).toEqual({
    changeValue: "Some file",
    formChangeName: "image",
    formChangeValue: "Some file"
  });

  component.unmount();
});

test("does not call callbacks when they are not provided", () => {
  const component = mount(<ImageField name="image" />);

  component.find("input").simulate("change", {
    target: { files: ["Some file"] }
  });

  component.unmount();
});

test("responds to edit callback", () => {
  let response = null;
  const onChange = value => {
    response = value;
  };

  const component = mount(<ImageField name="image" onChange={onChange} />);

  component.instance().handleImageEdited(image);
  expect(response).toEqual(image);

  component.unmount();
});

test("responds to failures", () => {
  let response = "foo";
  const onChange = value => {
    response = value;
  };

  const component = mount(<ImageField name="image" onChange={onChange} />);

  component.find("input").simulate("change", { target: { files: ["foo"] } });
  component.find("img").props().onError();

  expect(response).toBe(null);
});

test("handles closing the modal", () => {
  const component = mount(<ImageField name="image" />);

  component.setState({ editorOpen: true });
  component.instance().handleClose();

  expect(component.state().editorOpen).toBe(false);
});

test("handles deselecting files", () => {
  let response = "foo";
  const onChange = value => {
    response = value;
  };

  const component = mount(<ImageField name="image" onChange={onChange} />);

  component.find("input").simulate("change", { target: { files: [] } });
  expect(component.state().image).toBe(null);
});

test("displays a progress bar if progress is reported", () => {
  const component = mount(<ImageField name="image" progress={5} />);

  expect(component.find(".chq-ffd--im--prog")).toHaveLength(1);
});
