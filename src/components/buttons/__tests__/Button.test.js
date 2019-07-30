import React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import Button from "../Button";
import icons from "../../../icons.json";

const editIconPath = icons.edit.join(" ");
const loadingIconPath = icons["load-c"].join(" ");

const getIconPath = async container => {
  await waitForDomChange({ container });
  return container.querySelector("path").getAttribute("d");
};

test("has no violations", () => (
  expect(<Button>This is a button.</Button>).toHaveNoViolations()
));

test("renders without crashing", () => {
  const message = "This is a button.";
  const { queryByText } = render(<Button>{message}</Button>);

  expect(queryByText(message)).toBeTruthy();
});

test("passes on extra props", () => {
  const { container } = render(<Button className="button" />);

  expect(container.querySelector(".button")).toBeTruthy();
});

test("displays a loading indicator", async () => {
  const { container } = render(<Button loading>Loading</Button>);
  const iconPath = await getIconPath(container);

  expect(iconPath).toEqual(loadingIconPath);
});

test("displays a regular icon", async () => {
  const { container } = render(<Button icon="edit">Button</Button>);
  const iconPath = await getIconPath(container);

  expect(iconPath).toEqual(editIconPath);
});

test("loading overrides the regular icon", async () => {
  const { container } = render(<Button loading icon="edit">Button</Button>);
  const iconPath = await getIconPath(container);

  expect(iconPath).toEqual(loadingIconPath);
});
