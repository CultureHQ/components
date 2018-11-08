import React from "react";
import { mount } from "enzyme";

import * as FormFields from "../FormFields";

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
    const response = {
      changeValue: null,
      formChangeName: null,
      formChangeValue: null
    };

    const component = mount(
      <FormField
        name="name"
        onChange={changeValue => {
          Object.assign(response, { changeValue });
        }}
        onFormChange={(formChangeName, formChangeValue) => {
          Object.assign(response, { formChangeName, formChangeValue });
        }}
      />
    );

    component.find("input").simulate("change", { target: { value: "Kevin" } });

    expect(response).toEqual({
      changeValue: "Kevin",
      formChangeName: "name",
      formChangeValue: "Kevin"
    });
  });

  test("tracks touch status in component state", () => {
    const component = mount(<FormField name="name" required />);
    expect(component.text()).toEqual("");

    component.find("input").simulate("blur");
    expect(component.text()).toEqual("Required");
  });

  test("displays errors if submitted", () => {
    const component = mount(<FormField name="name" required />);
    expect(component.text()).toEqual("");

    component.setProps({ submitted: true });
    expect(component.text()).toEqual("Required");
  });

  test("requests focus when autoFocus is given", () => {
    const component = mount(<FormField name="name" autoFocus />);

    expect(component.find("input").props().id).toEqual(document.activeElement.id);
  });
});
