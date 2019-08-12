import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import CheerButton from "../CheerButton";

const Container = ({ cheered: initialCheered = false, small }) => {
  const [cheered, setCheered] = useState(initialCheered);

  const onCheerToggle = nextCheered => {
    setCheered(nextCheered);
    return Promise.resolve();
  };

  return <CheerButton cheered={cheered} small={small} onCheerToggle={onCheerToggle} />;
};

test("has no violations", () => (
  expect(<CheerButton cheered />).toHaveNoViolations()
));

test("renders a button and calls back", () => {
  const onCheerToggle = jest.fn(() => Promise.resolve());
  const { getByRole } = render(<CheerButton onCheerToggle={onCheerToggle} />);

  fireEvent.click(getByRole("button"));

  expect(onCheerToggle).toHaveBeenLastCalledWith(true);
});

test("renders a Cheer if it has been cheered", () => {
  const { container } = render(<CheerButton cheered />);

  expect(container.querySelectorAll("svg")).toHaveLength(2);
});

test("pops in the Cheer if it was not initially cheered", () => {
  const { container, getByRole } = render(<Container />);

  fireEvent.click(getByRole("button"));

  const cheers = container.querySelectorAll("svg");

  expect(cheers).toHaveLength(2);
  expect(cheers[1].classList).toContain("chq-chr-pp");
});

test("does not pop in the Cheer if it was initially cheered", () => {
  const { container } = render(<Container cheered />);
  const cheers = container.querySelectorAll("svg");

  expect(cheers).toHaveLength(2);
  expect(cheers[1].classList).not.toContain("chq-chr-pp");
});

test("does not display text when small", () => {
  const { container } = render(<Container small />);

  expect(container.textContent).toEqual("");
});
