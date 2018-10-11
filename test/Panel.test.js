import React from "react";
import { mount, shallow } from "enzyme";

import { Panel } from "../src";

test("renders without crashing", async () => {
  const component = (
    <Panel>
      <Panel.Heading>Heading</Panel.Heading>
      <Panel.Body>Body</Panel.Body>
      <Panel.Footer>Footer</Panel.Footer>
    </Panel>
  );

  expect(mount(component).find("div")).toHaveLength(4);
  await expect(component).toHaveNoViolations();
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

test("PanelLoaderBody passes on className", () => {
  const component = mount(<Panel.LoaderBody className="panel-loader-body" />);

  expect(component.find(".chq-pan--bd")).toHaveLength(1);
  expect(component.hasClass("panel-loader-body")).toBe(true);
});

test("PanelFooter passes on className", () => {
  const component = shallow(<Panel.Footer className="panel-footer" />);

  expect(component.hasClass("chq-pan--ft")).toBe(true);
  expect(component.hasClass("panel-footer")).toBe(true);
});

test("PanelLoaderBody handles loading", () => {
  const component = mount(<Panel.LoaderBody loading>Loaded</Panel.LoaderBody>);
  expect(component.text()).toEqual("");

  component.setProps({ loading: false });
  expect(component.text()).toEqual("Loaded");
});
