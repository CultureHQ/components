import React from "react";
import { mount } from "enzyme";

import { SelectField } from "../../src";

const OPTIONS = [
  { label: "Harry", value: "Harry" },
  { label: "Hermione", value: "Hermione" },
  { label: "Ron", value: "Ron" }
];

test("passes on className", () => {
  const component = mount(<SelectField name="name" className="select-field" />);

  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("select-field")).toBe(true);
});

test("calls up to callbacks if they are provided", () => {
  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <SelectField
      name="name"
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
      options={OPTIONS}
    />
  );

  component.find("select").simulate("change", { target: { value: "Harry" } });

  expect(response).toEqual({
    changeValue: "Harry",
    formChangeName: "name",
    formChangeValue: "Harry"
  });
});

test("does not call callbacks when they are not provided", () => {
  const component = mount(<SelectField name="name" options={OPTIONS} />);

  component.find("select").simulate("change", { target: { value: "Harry" } });
});
