import React, { useState } from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";

import CheerButton from "../CheerButton";

type ContainerProps = {
  cheered?: boolean;
  onCheerToggle?: (cheered: boolean) => void;
  small?: boolean;
};

const Container: React.FC<ContainerProps> = ({
  cheered: initialCheered = false,
  onCheerToggle: givenCheerToggle = () => {},
  small = false
}) => {
  const [cheered, setCheered] = useState(initialCheered);

  const onCheerToggle = (nextCheered: boolean) => {
    givenCheerToggle(nextCheered);
    setCheered(nextCheered);
    return Promise.resolve();
  };

  return <CheerButton cheered={cheered} small={small} onCheerToggle={onCheerToggle} />;
};

test("has no violations", () => (
  expect(<CheerButton cheered onCheerToggle={jest.fn()} />).toHaveNoViolations()
));

test("renders a button and calls back", async () => {
  const onCheerToggle = jest.fn();
  const { getByRole } = render(<Container onCheerToggle={onCheerToggle} />);

  await act(() => {
    fireEvent.click(getByRole("button"));
    return waitFor(() => expect(onCheerToggle).toHaveBeenCalledTimes(1));
  });

  expect(onCheerToggle).toHaveBeenLastCalledWith(true);
});

test("renders a Cheer if it has been cheered", () => {
  const { container } = render(<CheerButton cheered onCheerToggle={jest.fn()} />);

  expect(container.querySelectorAll("svg")).toHaveLength(2);
});

test("pops in the Cheer if it was not initially cheered", async () => {
  const onCheerToggle = jest.fn();
  const { container, getByRole } = render(
    <Container onCheerToggle={onCheerToggle} />
  );

  await act(() => {
    fireEvent.click(getByRole("button"));
    return waitFor(() => expect(onCheerToggle).toHaveBeenCalledTimes(1));
  });

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
