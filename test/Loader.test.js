import React from "react";
import { mount } from "enzyme";

import { Loader, Spinner } from "../src";

const Loaded = () => <p>Content loaded!</p>;

test("has no violations", async () => {
  await expect(<Loader loading />).toHaveNoViolations();
});

test("passes on className", () => {
  const component = mount(<Loader loading className="loader"><Loaded /></Loader>);

  expect(component.find(".chq-ldr")).toHaveLength(1);
  expect(component.find(".chq-ldr").hasClass("loader")).toBe(true);
});

test("renders a placeholder if loading and not yet spinning", () => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  expect(component.find(Loaded)).toHaveLength(0);
  expect(component.hasClass("chq-ldr-sp")).toBe(false);
});

test("does not set a timeout if the loader is not loading", () => {
  const component = mount(<Loader><Loaded /></Loader>);

  expect(component.instance().timeout).toBe(undefined);
  expect(component.find(Loaded)).toHaveLength(1);
});

test("does not render a spinner if the loading is completed", done => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  setTimeout(() => {
    component.update();
    expect(component.find(Spinner)).toHaveLength(0);

    done();
  }, 250);

  component.setProps({ loading: false });
});

test("renders a spinner if loading takes too long", done => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  setTimeout(() => {
    component.update();
    expect(component.find(".chq-ldr").hasClass("chq-ldr-sp")).toBe(true);

    done();
  }, 250);
});

test("renders the content once it has loaded", () => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  component.setProps({ loading: false });
  component.update();

  expect(component.find(Loaded)).toHaveLength(1);
});

test("clears the timeout if it exists when the component unmounts", done => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  expect(component.instance().timeout).not.toBe(null);

  setTimeout(() => {
    component.instance().componentWillUnmount();
    expect(component.instance().timeout).toBe(null);

    done();
  }, 250);
});

test("clears the timeout when the component unmounts", () => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  expect(component.instance().timeout).not.toBe(null);
  component.instance().componentWillUnmount();

  expect(component.instance().timeout).toBe(null);
});
