import React from "react";
import { mount } from "enzyme";

import {
  EmailField,
  NumberField,
  PasswordField,
  StringField
} from "../src";

[EmailField, NumberField, PasswordField, StringField].forEach(FormField => {
  test("passes on className", () => {
    const component = mount(
      <FormField label="Name" name="name" className="form-field" />
    );

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
        label="Name"
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
});
