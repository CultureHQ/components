import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Button from "../../buttons/Button";
import Modal from "../Modal";

test("opens a modal when the onTrigger function is called", () => {
  const message = "This is the body of the modal";
  const { getByText, queryByText } = render(
    <Modal trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}>
      <Modal.Heading>Heading</Modal.Heading>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>Footer</Modal.Footer>
    </Modal>
  );

  expect(queryByText(message)).toBeFalsy();

  fireEvent.click(getByText("Open"));

  expect(queryByText(message)).toBeTruthy();
});

test("closes the modal the heading button is clicked", () => {
  const onClose = jest.fn();
  const trigger = onTrigger => <Button onClick={onTrigger}>Open</Button>;

  const { getByLabelText, queryByText } = render(
    <Modal startOpen trigger={trigger} onClose={onClose}>
      <Modal.Heading>Heading</Modal.Heading>
    </Modal>
  );

  fireEvent.click(getByLabelText("Close"));

  expect(queryByText("Heading")).toBeFalsy();
  expect(onClose).toHaveBeenCalledTimes(1);
});
