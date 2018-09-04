import React from "react";
import { mount } from "enzyme";

import FileField from "../src/components/FileField";

test("passes on className", () => {
  const component = mount(<FileField name="name" className="file-field" />);

  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("file-field")).toBe(true);
});

test("calls up to callbacks if they are provided", () => {
  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <FileField
      name="name"
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  const file = { foo: "bar" };
  component.find("input[type='file']").simulate("change", {
    target: { files: [file] }
  });

  expect(response).toEqual({
    changeValue: file,
    formChangeName: "name",
    formChangeValue: file
  });
});

test("tracks touch status in component state", () => {
  const component = mount(<FileField name="name" required />);
  expect(component.text()).toEqual("");

  component.find("input[type='file']").simulate("change", {
    target: { files: [{ foo: "bar" }] }
  });
  expect(component.text()).toEqual("Required");
});
