import React from "react";
import { mount } from "enzyme";

import { Button, Modal, PlainButton } from "../src";

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
  const component = mount(
    <Modal startOpen trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}>
      <Modal.Heading>Heading</Modal.Heading>
    </Modal>
  );

  component.find(PlainButton).simulate("click");
  expect(component.find(".chq-pan--hd")).toHaveLength(0);
});
