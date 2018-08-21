import React from "react";
import { mount } from "enzyme";

import { Loader, Spinner } from "../src";

const Loaded = () => <p>Content loaded!</p>;

test("renders nothing if loading and not yet spinning", () => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  expect(component.html()).toBe(null);
  expect(component.find(Loaded)).toHaveLength(0);
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

test("clears the timeout when the component unmounts", () => {
  const component = mount(<Loader loading><Loaded /></Loader>);

  expect(component.instance().timeout).not.toBe(null);
  component.unmount();
});
