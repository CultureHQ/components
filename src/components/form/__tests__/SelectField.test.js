import React from "react";
import { mount } from "enzyme";

import SelectField from "../SelectField";

const OPTIONS = [
  { label: "Harry", value: "Harry" },
  { label: "Hermione", value: "Hermione" },
  { label: "Ron", value: "Ron" }
];

test("has no violations", async () => {
  const jsx = (
    <SelectField name="select" options={OPTIONS}>
      SelectField
    </SelectField>
  );

  await expect(jsx).toHaveNoViolations();
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
      onChange={changeValue => Object.assign(response, { changeValue })}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
      options={OPTIONS}
    />
  );

  component.instance().handleSelect("Harry");

  expect(response).toEqual({
    changeValue: "Harry",
    formChangeName: "select",
    formChangeValue: "Harry"
  });
});

test("requests focus when autoFocus is given", () => {
  mount(<SelectField name="select" autoFocus />);

  expect(document.activeElement.className).toEqual("chq-ffd--ctrl");
});
