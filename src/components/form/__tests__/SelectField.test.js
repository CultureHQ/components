import React, { useState } from "react";
import { mount } from "enzyme";

import SelectField from "../SelectField";

const OPTIONS = [
  { label: "Harry", value: "harry" },
  { label: "Hermione", value: "hermione" },
  { label: "Ron", value: "ron" }
];

const Container = ({ creatable = false, multiple = false }) => {
  const [value, setValue] = useState("");

  return (
    <SelectField
      name="select"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      creatable={creatable}
      multiple={multiple}
    >
      Select
    </SelectField>
  );
};

const mountWithUtils = jsx => {
  const component = mount(jsx);

  return Object.assign(component, {
    getMultiValue() {
      return component.find("input[type='hidden']").map(node => node.props().value);
    },
    matchSingleText(value) {
      component.find(".chq-ffd--ctrl").simulate("change", { target: { value } });
    },
    matchMultiText(value) {
      component.find(".chq-ffd--sl--match").simulate("change", { target: { value } });
    }
  });
};

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

test("working with a single non-creatable field", () => {
  const component = mountWithUtils(<Container />);

  component.matchSingleText("H");
  expect(component.find("SelectFieldOption")).toHaveLength(2);

  component.matchSingleText("He");
  expect(component.find("SelectFieldOption")).toHaveLength(1);

  component.matchSingleText("Hel");
  expect(component.find("SelectFieldOption")).toHaveLength(0);
  expect(component.find("p")).toHaveLength(1);

  component.matchSingleText("");
  expect(component.find("SelectFieldOption")).toHaveLength(3);

  component.find("SelectFieldOption").at(0).simulate("click");
  expect(component.find("#select").props().value).toEqual(OPTIONS[0].value);
  expect(component.find(".chq-ffd--ctrl").props().value).toEqual(OPTIONS[0].label);

  const twice = callback => [0, 1].forEach(callback);

  twice(() => {
    component.find(".chq-ffd--ctrl").simulate("keydown", { key: "Enter" });
    expect(component.find("DoorEffect").props().open).toBe(true);
  });

  twice(() => {
    component.find(".chq-ffd--ctrl").simulate("keydown", { key: "Escape" });
    expect(component.find("DoorEffect").props().open).toBe(false);
  });

  component.find(".chq-ffd--ctrl").simulate("keydown", { key: "Backspace" });
  expect(component.find("DoorEffect").props().open).toBe(false);
});

test("working with a single creatable field", () => {
  const component = mountWithUtils(<Container creatable />);

  component.matchSingleText("Hello");
  expect(component.find("SelectFieldOption")).toHaveLength(1);
  expect(component.find("p")).toHaveLength(0);

  component.find("SelectFieldOption").simulate("click");
  expect(component.find("#select").props().value).toEqual("Hello");
  expect(component.find(".chq-ffd--ctrl").props().value).toEqual("Hello");
});

test("working with a multiple non-creatable field", () => {
  const component = mountWithUtils(<Container multiple />);

  component.matchMultiText("H");
  expect(component.find("SelectFieldOption")).toHaveLength(2);

  component.find("SelectFieldOption").at(0).simulate("click");
  expect(component.find("Badge")).toHaveLength(1);
  expect(component.getMultiValue()).toEqual([OPTIONS[0].value]);

  component.find("SelectFieldOption").at(1).simulate("click");
  expect(component.find("Badge")).toHaveLength(2);
  expect(component.getMultiValue()).toEqual([OPTIONS[0].value, OPTIONS[1].value]);

  component.find("Badge").at(0).simulate("click");
  expect(component.getMultiValue()).toEqual([OPTIONS[1].value]);
});

test("working with a multiple creatable field", () => {
  const component = mountWithUtils(<Container creatable multiple />);

  component.matchMultiText("Hello");
  expect(component.find("SelectFieldOption")).toHaveLength(1);
  expect(component.find("p")).toHaveLength(0);

  component.find("SelectFieldOption").simulate("click");
  expect(component.getMultiValue()).toEqual(["Hello"]);
});
