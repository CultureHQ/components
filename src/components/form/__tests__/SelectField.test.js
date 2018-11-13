import React, { useState } from "react";
import { mount } from "enzyme";

import SelectField from "../SelectField";

const twice = callback => [0, 1].forEach(callback);

const OPTIONS = [
  { label: "Harry", value: "harry" },
  { label: "Hermione", value: "hermione" },
  { label: "Ron", value: "ron" }
];

const Container = ({ creatable = false, multiple = false, value: initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);

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
      component.find(".chq-ffd--ctrl").simulate("change", {
        target: { value },
        nativeEvent: { data: value[value.length - 1] }
      });
      component.update();
    },
    matchMultiText(value) {
      component.find(".chq-ffd--sl--match").simulate("change", { target: { value } });
      component.update();
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

test("closes the options when clicked outside the select field", () => {
  const events = {};
  window.addEventListener = jest.fn((event, callback) => {
    events[event] = callback;
  });

  const component = mount(
    <div>
      <Container />
      <div className="outside" />
    </div>
  );

  component.find(".chq-ffd--ctrl").simulate("click");

  events.click({ target: component.find(".chq-ffd--ctrl").instance() });
  component.update();
  expect(component.find("DoorEffect").props().open).toBe(true);

  events.click({ target: component.find("div.outside").instance() });
  component.update();
  expect(component.find("DoorEffect").props().open).toBe(false);

  component.unmount();
});

test("working with a single non-creatable field", () => {
  const component = mountWithUtils(<Container value="harry" />);

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
  expect(component.find("#select").props().value).toEqual("");
  expect(component.find(".chq-ffd--ctrl").props().value).toEqual("");

  component.find("SelectFieldOption").at(1).simulate("click");
  expect(component.find("#select").props().value).toEqual(OPTIONS[1].value);
  expect(component.find(".chq-ffd--ctrl").props().value).toEqual(OPTIONS[1].label);

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

  component.find(".chq-ffd--ctrl").simulate("click");
  expect(document.activeElement.className).toEqual("chq-ffd--sl--match");

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

  twice(() => {
    component.find(".chq-ffd--sl--match").simulate("keydown", { key: "Escape" });
    expect(component.find("DoorEffect").props().open).toBe(false);
  });

  twice(() => {
    component.find(".chq-ffd--sl--match").simulate("keydown", { key: "Enter" });
    expect(component.find("DoorEffect").props().open).toBe(true);
  });

  twice(() => {
    component.find(".chq-ffd--sl--match").simulate("keydown", { key: "Backspace" });
    expect(component.getMultiValue()).toEqual([]);
  });

  component.find(".chq-ffd--sl--match").simulate("change", { target: { value: "Test" } });
  component.find(".chq-ffd--sl--match").simulate("keydown", { key: "Backspace" });
  expect(component.getMultiValue()).toEqual([]);

  component.find(".chq-ffd--sl--match").simulate("keydown", { key: "Tab" });
});

test("working with a multiple creatable field", () => {
  const component = mountWithUtils(<Container creatable multiple />);

  component.matchMultiText("Hello");
  expect(component.find("SelectFieldOption")).toHaveLength(1);
  expect(component.find("p")).toHaveLength(0);

  component.find("SelectFieldOption").simulate("click");
  expect(component.getMultiValue()).toEqual(["Hello"]);
});
