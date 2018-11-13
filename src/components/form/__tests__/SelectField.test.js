import React from "react";
import { mount } from "enzyme";

import SelectField from "../SelectField";

const OPTIONS = [
  { label: "Harry", value: "harry" },
  { label: "Hermione", value: "hermione" },
  { label: "Ron", value: "ron" }
];

test("has no violations", async () => {
  const jsx = (
    <SelectField name="select" options={OPTIONS}>
      Select
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

test.only("working with a single non-creatable field", () => {
  const component = mount(<SelectField name="select" options={OPTIONS}>Select</SelectField>);

  component.matchText = value => {
    component.find(".chq-ffd--ctrl").simulate("change", { target: { value } });
  };

  component.matchText("H");
  expect(component.find("SelectFieldOption")).toHaveLength(2);

  component.matchText("He");
  expect(component.find("SelectFieldOption")).toHaveLength(1);

  component.matchText("Hel");
  expect(component.find("SelectFieldOption")).toHaveLength(0);
  expect(component.find("p")).toHaveLength(1);

  component.matchText("");
  expect(component.find("SelectFieldOption")).toHaveLength(3);

  component.find("SelectFieldOption").at(0).simulate("click");
  expect(component.find(".chq-ffd--ctrl").props().value).toEqual(OPTIONS[0].label);
});
