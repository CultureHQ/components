import React from "react";
import { mount } from "enzyme";

import { Button, Confirm, ModalDialog } from "../src";

test("opens a modal when the onTrigger function is called", () => {
  const message = "This is the body of the confirmation";

  const component = mount(
    <Confirm trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}>
      {message}
    </Confirm>
  );

  expect(component.find(".chq-pan--bd")).toHaveLength(0);

  component.find(Button).simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(1);
  expect(component.find(ModalDialog.Body).text()).toContain(message);
});

test("closes the modal the cancel button is clicked", () => {
  const component = mount(
    <Confirm startOpen trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}>
      Are you sure?
    </Confirm>
  );

  component.find(".chq-btn-iv").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
});

test("calls the onAccept callback and closes when the confirmation is accepted", () => {
  let accepted = false;
  const onAccept = () => {
    accepted = true;
  };

  const trigger = onTrigger => <Button onClick={onTrigger}>Open</Button>;

  const component = mount(
    <Confirm danger onAccept={onAccept} startOpen trigger={trigger}>
      Are you sure?
    </Confirm>
  );

  component.find(".chq-btn-dg").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
  expect(accepted).toBe(true);
});
