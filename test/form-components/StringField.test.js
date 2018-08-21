import React from "react";
import { shallow } from "enzyme";

import { StringField } from "../../src";

test("renders without crashing", () => {
  const component = shallow(<StringField label="Name" name="name" />);

  expect(component.type()).toEqual("label");
});

test("passes on className", () => {
  const component = shallow(
    <StringField label="Name" name="name" className="string-field" />
  );

  expect(component.hasClass("chq-sfd")).toBe(true);
  expect(component.hasClass("string-field")).toBe(true);
});

test("tracks the input value in state", () => {
  const component = shallow(<StringField label="Name" name="name" />);

  component.find("input").simulate("change", { target: { value: "Kevin" } });
  component.update();

  expect(component.state().value).toEqual("Kevin");
});
