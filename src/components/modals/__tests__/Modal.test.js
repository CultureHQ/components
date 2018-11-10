import React from "react";
import { mount } from "enzyme";

import Button from "../../buttons/Button";
import PlainButton from "../../buttons/PlainButton";
import Modal from "../Modal";

test("opens a modal when the onTrigger function is called", () => {
  const message = "This is the body of the modal";

  const component = mount(
    <Modal trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}>
      <Modal.Heading>Heading</Modal.Heading>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>Footer</Modal.Footer>
    </Modal>
  );

  expect(component.find(".chq-pan--bd")).toHaveLength(0);

  component.find(Button).simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(1);
  expect(component.find(Modal.Body).text()).toContain(message);
});

test("closes the modal the heading button is clicked", () => {
  let called = false;
  const onClose = () => {
    called = true;
  };

  const trigger = onTrigger => <Button onClick={onTrigger}>Open</Button>;

  const component = mount(
    <Modal startOpen trigger={trigger} onClose={onClose}>
      <Modal.Heading>Heading</Modal.Heading>
    </Modal>
  );

  component.find(PlainButton).simulate("click");
  expect(component.find(".chq-pan--hd")).toHaveLength(0);
  expect(called).toBe(true);
});
