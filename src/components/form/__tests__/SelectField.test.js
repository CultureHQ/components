import React from "react";
import { mount } from "enzyme";

import SelectField from "../SelectField";

const OPTIONS = [
  { label: "Harry", value: "Harry" },
  { label: "Hermione", value: "Hermione" },
  { label: "Ron", value: "Ron" }
];

test("has no violations", async () => {
  await expect(<SelectField name="select">SelectField</SelectField>).toHaveNoViolations();
});

test("passes on className", () => {
  const component = mount(<SelectField name="select" className="select-field" />);

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
      name="select"
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
    formChangeName: "select",
    formChangeValue: "Harry"
  });
});

test("does not call callbacks when they are not provided", () => {
  const component = mount(<SelectField name="select" options={OPTIONS} />);

  component.find("select").simulate("change", { target: { value: "Harry" } });
});

test("requests focus when autoFocus is given", () => {
  const component = mount(<SelectField name="select" autoFocus />);

  expect(component.find("select").props().id).toEqual(document.activeElement.id);
});
