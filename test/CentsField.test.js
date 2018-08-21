import React from "react";
import { mount } from "enzyme";

import { CentsField } from "../src";

const withFindRequired = component => Object.assign(component, {
  findRequired: () => component.find(".chq-ffd--rq")
});

test("tracks the input value in state", () => {
  const component = mount(<CentsField label="Cents" name="cents" />);

  component.find("input").simulate("change", { target: { value: 1.23 } });
  component.update();

  expect(component.find("input").props().value).toEqual(1.23);
});

test("displays a label if the value is required and the input touched", () => {
  const component = withFindRequired(mount(
    <CentsField label="Cents" name="cents" required />
  ));
  expect(component.findRequired()).toHaveLength(0);

  component.find("input").simulate("change", { target: { value: "" } });
  component.update();

  expect(component.findRequired()).toHaveLength(1);
});

test("prefers parent touched value", () => {
  const component = withFindRequired(mount(
    <CentsField label="Cents" name="cents" required />
  ));

  expect(component.findRequired()).toHaveLength(0);
  component.setProps({ touched: true });
  component.update();

  expect(component.findRequired()).toHaveLength(1);
});

test("calls up to onValueChange if that callback is provided", () => {
  let response = null;
  const onValueChange = mutation => {
    response = mutation;
  };

  const component = mount(
    <CentsField label="Cents" name="cents" onValueChange={onValueChange} />
  );

  component.find("input").simulate("change", { target: { value: 1.23 } });
  expect(response).toEqual({ cents: 123 });
});
