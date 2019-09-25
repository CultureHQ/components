import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Button from "../../buttons/Button";
import Confirm, { ConfirmDelete } from "../Confirm";

test("opens a modal when the onTrigger function is called", () => {
  const message = "This is the body of the confirmation";
  const { getByText, queryByText } = render(
    <Confirm
      onAccept={jest.fn()}
      trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
    >
      {message}
    </Confirm>
  );

  expect(queryByText(message)).toBeFalsy();

  fireEvent.click(getByText("Open"));

  expect(queryByText(message)).toBeTruthy();
});

test("calls the onOpen callback if it is provided", () => {
  const onOpen = jest.fn();
  const { getByText } = render(
    <Confirm
      onAccept={jest.fn()}
      trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
      onOpen={onOpen}
    >
      Are you sure?
    </Confirm>
  );

  expect(onOpen).not.toHaveBeenCalled();

  fireEvent.click(getByText("Open"));

  expect(onOpen).toHaveBeenCalledTimes(1);
});

test("closes the modal the cancel button is clicked", () => {
  const message = "Are you sure?";
  const { getByText, queryByText } = render(
    <Confirm onAccept={jest.fn()} startOpen trigger={() => null}>
      {message}
    </Confirm>
  );

  expect(queryByText(message)).toBeTruthy();

  fireEvent.click(getByText("Cancel"));

  expect(queryByText(message)).toBeFalsy();
});

test("calls the onAccept callback and closes when the confirmation is accepted", () => {
  const message = "Are you sure?";
  const onAccept = jest.fn();

  const { getByText, queryByText } = render(
    <Confirm accept="Yes" danger onAccept={onAccept} startOpen trigger={() => null}>
      {message}
    </Confirm>
  );

  expect(queryByText(message)).toBeTruthy();
  fireEvent.click(getByText("Yes"));

  expect(queryByText(message)).toBeFalsy();
  expect(onAccept).toHaveBeenCalledTimes(1);
});

test("ConfirmDelete sets default values", () => {
  const { queryByText } = render(
    <ConfirmDelete onAccept={jest.fn()} startOpen trigger={() => null}>
      Are you sure?
    </ConfirmDelete>
  );

  expect(queryByText("Delete")).toBeTruthy();
});

test("passes on contentRef", () => {
  let content: null | HTMLDivElement = null;
  const contentRef = (element: HTMLDivElement) => {
    content = element;
  };

  render(
    <Confirm onAccept={jest.fn()} startOpen contentRef={contentRef} trigger={() => null}>
      Are you sure?
    </Confirm>
  );

  expect(content).not.toBe(null);
});
