import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Dropdown from "../Dropdown";

const Component: React.FC<Omit<React.ComponentProps<typeof Dropdown>, "children">> = props => (
  <Dropdown {...props}>
    <Dropdown.Button>
      House
    </Dropdown.Button>
    <Dropdown.ListBox>
      <Dropdown.Option value="gryffindor">Gryffindor</Dropdown.Option>
      <Dropdown.Option value="hufflepuff">Hufflepuff</Dropdown.Option>
      <Dropdown.Option value="ravenclaw">Ravenclaw</Dropdown.Option>
      <Dropdown.Option value="slytherin">Slytherin</Dropdown.Option>
    </Dropdown.ListBox>
  </Dropdown>
);

test("has no violations", () => (
  expect(<Component selected="gryffindor" onChange={jest.fn()} />).toHaveNoViolations()
));

test("calls up to onChange", () => {
  const onChange = jest.fn();
  const { getByText } = render(<Component selected="gryffindor" onChange={onChange} />);

  fireEvent.click(getByText("Hufflepuff"));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith("hufflepuff");
});

test("sets aria-selected on the proper component", () => {
  const { container, getByText } = render(
    <Component selected="ravenclaw" onChange={jest.fn()} />
  );

  const selectedOption = container.querySelector("[aria-selected=\"true\"]");
  expect(selectedOption).toEqual(getByText("Ravenclaw"));
});
