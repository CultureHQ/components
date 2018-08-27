import React from "react";
import { mount } from "enzyme";

import { CentsField } from "../src";

test("calls up to callbacks if they are provided", () => {
  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <CentsField
      label="Cents"
      name="cents"
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.find("input").simulate("change", { target: { value: 1.23 } });

  expect(response).toEqual({
    changeValue: 123,
    formChangeName: "cents",
    formChangeValue: 123
  });
});

test("displays the value using cents", () => {
  const component = mount(<CentsField label="Cents" name="cents" value={123} />);

  expect(component.find("input").props().value).toEqual(1.23);
});
