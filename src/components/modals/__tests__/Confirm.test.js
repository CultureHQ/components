import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Button from "../../buttons/Button";
import Confirm, { ConfirmDelete } from "../Confirm";
import ModalDialog from "../ModalDialog";

test("opens a modal when the onTrigger function is called", () => {
  const message = "This is the body of the confirmation";
  const { getByText, queryByText } = render(
    <Confirm trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}>
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
      trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
      onOpen={onOpen}
    />
  );

  expect(onOpen).not.toHaveBeenCalled();

  fireEvent.click(getByText("Open"));

  expect(onOpen).toHaveBeenCalled();
});

test("closes the modal the cancel button is clicked", () => {
  const message = "Are you sure?";
  const { getByText, queryByText } = render(
    <Confirm startOpen trigger={() => {}}>{message}</Confirm>
  );

  expect(queryByText(message)).toBeTruthy();

  fireEvent.click(getByText("Cancel"));

  expect(queryByText(message)).toBeFalsy();
});

test("calls the onAccept callback and closes when the confirmation is accepted", () => {
  const message = "Are you sure?";
  const onAccept = jest.fn();

  const { getByText, queryByText } = render(
    <Confirm accept="Yes" danger onAccept={onAccept} startOpen trigger={() => {}}>
      {message}
    </Confirm>
  );

  expect(queryByText(message)).toBeTruthy();
  fireEvent.click(getByText("Yes"));

  expect(queryByText(message)).toBeFalsy();
  expect(onAccept).toHaveBeenCalled();
});

test("ConfirmDelete sets default values", () => {
  const { queryByText } = render(<ConfirmDelete startOpen trigger={() => {}} />);

  expect(queryByText("Delete")).toBeTruthy();
});

test("passes on contentRef", () => {
  const contentRef = element => {
    contentRef.current = element;
  };

  render(<Confirm startOpen contentRef={contentRef} trigger={() => {}} />);

  expect(contentRef.current).not.toBe(undefined);
});
