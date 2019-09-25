import React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import Button from "../Button";
import icons from "../../../icons.json";

const editIconPath = icons.edit.join(" ");
const loadingIconPath = icons["load-c"].join(" ");

const getIconPath = async (container: HTMLElement) => {
  await waitForDomChange({ container });

  const pathElement = container.querySelector("path") as SVGElement;
  expect(pathElement).not.toBe(null);

  return pathElement.getAttribute("d");
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

type LinkProps = {
  children: React.ReactNode;
  className: string;
  to: string;
};

const Link: React.FC<LinkProps> = ({ children, className, to }) => (
  <a href={to} className={className}>{children}</a>
);

test("allows overriding the type", () => {
  const to = "http://localhost/";
  const { container } = render(<Button as={Link} inverted to={to} />);
  const anchorElement = container.firstChild as HTMLAnchorElement;

  expect(anchorElement).not.toBe(null);
  expect(anchorElement.href).toEqual(to);
  expect(container.querySelector(".chq-btn-iv")).toBeTruthy();
});
