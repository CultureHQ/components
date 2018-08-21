import React from "react";
import { mount } from "enzyme";

import {
  EmailField,
  NumberField,
  PasswordField,
  StringField
} from "../src";

const withFindRequired = component => Object.assign(component, {
  findRequired: () => component.find(".chq-ffd--rq")
});

[EmailField, NumberField, PasswordField, StringField].forEach(FormField => {
  test("passes on className", () => {
    const component = mount(
      <FormField label="Name" name="name" className="form-field" />
    );

    expect(component.find("label").hasClass("chq-ffd")).toBe(true);
    expect(component.find("label").hasClass("form-field")).toBe(true);
  });

  test("tracks the input value in state", () => {
    const component = mount(<FormField label="Name" name="name" />);

    component.find("input").simulate("change", { target: { value: "Kevin" } });
    component.update();

    expect(component.find("input").props().value).toEqual("Kevin");
  });

  test("displays a label if the value is required and the input touched", () => {
    const component = withFindRequired(mount(
      <FormField label="Name" name="name" required />
    ));
    expect(component.findRequired()).toHaveLength(0);

    component.find("input").simulate("change", { target: { value: "" } });
    component.update();

    expect(component.findRequired()).toHaveLength(1);
  });

  test("does not display a required label without the required prop", () => {
    const component = withFindRequired(mount(
      <FormField label="Name" name="name" />
    ));
    expect(component.findRequired()).toHaveLength(0);

    component.find("input").simulate("change", { target: { value: "" } });
    component.update();

    expect(component.findRequired()).toHaveLength(0);
  });

  test("prefers parent touched value", () => {
    const component = withFindRequired(mount(
      <FormField label="Name" name="name" required />
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
      <FormField label="Name" name="name" onValueChange={onValueChange} />
    );

    component.find("input").simulate("change", { target: { value: "Kevin" } });
    expect(response).toEqual({ name: "Kevin" });
  });
});
