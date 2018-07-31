import React from "react";
import { shallow } from "enzyme";

import Nav from "../src/components/Nav";

test("renders without crashing", () => {
  const message = "This is a nav.";
  const component = shallow(<Nav>{message}</Nav>);

  expect(component.html()).toContain(message);
});

test("passes on className", () => {
  const component = shallow(<Nav className="nav" />);

  expect(component.hasClass("nav")).toBe(true);
  expect(component.hasClass("chq-nav")).toBe(true);
});

test("hides the nav when the page is scrolled down", () => {
  const component = shallow(<Nav />);
  expect(component.hasClass("chq-nav-hd")).toBe(false);

  window.pageYOffset = 50;
  component.instance().handleWindowScroll();
  component.update();

  expect(component.hasClass("chq-nav-hd")).toBe(true);
  component.unmount();
});

test("shows the nav when the page is scrolled up", () => {
  window.pageYOffset = 100;

  const component = shallow(<Nav />);
  expect(component.hasClass("chq-nav-hd")).toBe(false);

  window.pageYOffset = 50;
  component.instance().handleWindowScroll();
  component.update();

  expect(component.hasClass("chq-nav-hd")).toBe(false);
  component.unmount();
});
