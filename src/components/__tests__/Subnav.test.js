import React, { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import Subnav from "../Subnav";

const Container = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Subnav activeIndex={activeIndex} onChange={setActiveIndex}>
      {children}
    </Subnav>
  );
};

test("has no violations", () => {
  const component = (
    <Subnav>
      <Subnav.Item>One</Subnav.Item>
      <Subnav.Item>Two</Subnav.Item>
      <Subnav.Item>Three</Subnav.Item>
    </Subnav>
  );

  return expect(component).toHaveNoViolations();
});

test("renders without crashing", () => {
  const clicks = [];
  const onChange = index => clicks.push(index);

  const { getAllByRole } = render(
    <Subnav onChange={onChange}>
      <Subnav.Item>One</Subnav.Item>
      <Subnav.Item>Two</Subnav.Item>
      <Subnav.Item>Three</Subnav.Item>
    </Subnav>
  );

  const pattern = [2, 0, 1];
  const buttons = getAllByRole("button");

  pattern.forEach(index => {
    fireEvent.click(buttons[index]);
  });

  expect(clicks).toEqual(pattern);
});

test("additionally functions as a controlled component", () => {
  const { getAllByRole } = render(
    <Container>
      <Subnav.Item>One</Subnav.Item>
      <Subnav.Item>Two</Subnav.Item>
      <Subnav.Item>Three</Subnav.Item>
    </Container>
  );

  const buttons = getAllByRole("button");
  act(() => void fireEvent.click(buttons[1]));

  expect(buttons[1].getAttribute("aria-current")).toEqual("true");
});
