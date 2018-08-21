import React from "react";
import { mount, shallow } from "enzyme";

import { Panel } from "../src";

test("renders without crashing", () => {
  const component = mount(
    <Panel>
      <Panel.Heading>Heading</Panel.Heading>
      <Panel.Body>Body</Panel.Body>
      <Panel.Footer>Footer</Panel.Footer>
    </Panel>
  );

  expect(component.find("div")).toHaveLength(4);
});

test("Panel passes on className", () => {
  const component = shallow(<Panel className="panel" />);

  expect(component.hasClass("chq-pan")).toBe(true);
  expect(component.hasClass("panel")).toBe(true);
});

test("PanelHeading passes on className", () => {
  const component = shallow(<Panel.Heading className="panel-heading" />);

  expect(component.hasClass("chq-pan--hd")).toBe(true);
  expect(component.hasClass("panel-heading")).toBe(true);
});

test("PanelBody passes on className", () => {
  const component = shallow(<Panel.Body className="panel-body" />);

  expect(component.hasClass("chq-pan--bd")).toBe(true);
  expect(component.hasClass("panel-body")).toBe(true);
});

test("PanelFooter passes on className", () => {
  const component = shallow(<Panel.Footer className="panel-footer" />);

  expect(component.hasClass("chq-pan--ft")).toBe(true);
  expect(component.hasClass("panel-footer")).toBe(true);
});
