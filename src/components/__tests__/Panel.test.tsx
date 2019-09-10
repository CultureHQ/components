import * as React from "react";
import { render } from "@testing-library/react";

import Panel from "../Panel";

test("renders without crashing", async () => {
  const { queryByText } = render(
    <Panel>
      <Panel.Heading>Heading</Panel.Heading>
      <Panel.Body>Body</Panel.Body>
      <Panel.Footer>Footer</Panel.Footer>
    </Panel>
  );

  ["Heading", "Body", "Footer"].forEach(text => {
    expect(queryByText(text)).toBeTruthy();
  });
});

test("has no violations", () => {
  const component = (
    <Panel>
      <Panel.Heading>Heading</Panel.Heading>
      <Panel.Body>Body</Panel.Body>
      <Panel.Footer>Footer</Panel.Footer>
    </Panel>
  );

  return expect(component).toHaveNoViolations();
});

test("Panel passes on className", () => {
  const { container } = render(<Panel className="panel" />);

  expect(container.querySelector(".panel")).toBeTruthy();
});

test("Panel passes on other props", () => {
  const { queryByRole } = render(<Panel role="presentation" />);

  expect(queryByRole("presentation")).toBeTruthy();
});

test("PanelHeading passes on className", () => {
  const { container } = render(<Panel.Heading className="panel-heading" />);

  expect(container.querySelector(".panel-heading")).toBeTruthy();
});

test("PanelBody passes on className", () => {
  const { container } = render(<Panel.Body className="panel-body" />);

  expect(container.querySelector(".panel-body")).toBeTruthy();
});

test("PanelLoaderBody passes on className", () => {
  const { container } = render(
    <Panel.LoaderBody loading={false} className="panel-loader-body" />
  );

  expect(container.querySelector(".panel-loader-body")).toBeTruthy();
});

test("PanelFooter passes on className", () => {
  const { container } = render(<Panel.Footer className="panel-footer" />);

  expect(container.querySelector(".panel-footer")).toBeTruthy();
});

test("PanelLoaderBody handles loading", () => {
  const { rerender, queryByText } = render(
    <Panel.LoaderBody loading>Loaded</Panel.LoaderBody>
  );

  expect(queryByText("Loaded")).toBeFalsy();

  rerender(<Panel.LoaderBody loading={false}>Loaded</Panel.LoaderBody>);
  expect(queryByText("Loaded")).toBeTruthy();
});
