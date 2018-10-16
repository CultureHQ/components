import React from "react";
import { mount } from "enzyme";

import { TextField } from "../../src";

test("passes on className", () => {
  const component = mount(<TextField name="text" className="text-field" />);

  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("text-field")).toBe(true);
});

test("calls up to callbacks if they are provided", () => {
  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <TextField
      name="text"
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.find("textarea").simulate("change", { target: { value: "Kevin" } });

  expect(response).toEqual({
    changeValue: "Kevin",
    formChangeName: "text",
    formChangeValue: "Kevin"
  });
});

test("tracks touch status in component state", () => {
  const component = mount(<TextField name="text" required />);
  expect(component.text()).toEqual("");

  component.find("textarea").simulate("change", { target: { value: "" } });
  component.find("textarea").simulate("blur");
  expect(component.text()).toEqual("Required");
});

test("displays errors if submitted", () => {
  const component = mount(<TextField name="text" required />);
  expect(component.text()).toEqual("");

  component.setProps({ submitted: true });
  expect(component.text()).toEqual("Required");
});
