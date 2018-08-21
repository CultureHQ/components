import React from "react";
import { mount } from "enzyme";

import { Loader, Spinner } from "../src";

const Loaded = () => <p>Content loaded!</p>;

test("renders nothing if loading and not yet spinning", () => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  expect(component.html()).toBe(null);
  expect(component.find(Loaded)).toHaveLength(0);
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
    expect(component.find(Spinner)).toHaveLength(1);

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
