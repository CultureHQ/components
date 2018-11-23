import React from "react";
import { mount } from "enzyme";

import * as FormFields from "../FormFields";
import Form from "../Form";

const CASES = Object.keys(FormFields).map(fieldName => [fieldName, FormFields[fieldName]]);

describe.each(CASES)("%s", (fieldName, FormField) => {
  test("has no violations", async () => {
    await expect(<FormField name="field">Field</FormField>).toHaveNoViolations();
  });

  test("passes on className", () => {
    const component = mount(<FormField name="name" className="form-field" />);

    expect(component.find("label").hasClass("chq-ffd")).toBe(true);
    expect(component.find("label").hasClass("form-field")).toBe(true);
  });

  test("calls up to callbacks if they are provided", () => {
    const onChange = jest.fn();
    const component = mount(
      <Form>
        <FormField name="name" onChange={onChange} />
      </Form>
    );

    component.find("input").simulate("change", { target: { value: "Kevin" } });

    expect(onChange).toHaveBeenCalledWith("Kevin");
  });

  test("tracks touch status in component state", () => {
    const component = mount(<FormField name="name" required />);
    expect(component.text()).toEqual("");

    component.find("input").simulate("blur");

    expect(component.text()).toEqual("Required");
  });

  test("displays errors if submitted", () => {
    const component = mount(<Form><FormField name="name" required /></Form>);
    expect(component.text()).toEqual("");

    component.setState({ submitted: true });
    expect(component.text()).toEqual("Required");
  });

  test("requests focus when autoFocus is given", () => {
    const component = mount(<FormField name="name" autoFocus />);

    expect(component.find("input").props().id).toEqual(document.activeElement.id);
  });
});
