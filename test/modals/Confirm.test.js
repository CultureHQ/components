import React from "react";
import { mount } from "enzyme";

import { Button, Confirm, ConfirmDelete, ModalDialog } from "../../src";

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

test("calls the onOpen callback if it is provided", () => {
  let opened = false;

  const component = mount(
    <Confirm
      trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
      onOpen={() => { opened = true; }}
    />
  );

  expect(opened).toBe(false);

  component.find(Button).simulate("click");
  expect(opened).toBe(true);
});

test("closes the modal the cancel button is clicked", () => {
  const component = mount(<Confirm startOpen trigger={() => {}}>Are you sure?</Confirm>);

  component.find(".chq-btn-iv").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
});

test("calls the onAccept callback and closes when the confirmation is accepted", () => {
  let accepted = false;
  const onAccept = () => {
    accepted = true;
  };

  const component = mount(
    <Confirm danger onAccept={onAccept} startOpen trigger={() => {}}>
      Are you sure?
    </Confirm>
  );

  component.find(".chq-btn-dg").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
  expect(accepted).toBe(true);
});

test("ConfirmDelete sets default values", () => {
  const component = mount(<ConfirmDelete startOpen trigger={() => {}} />);

  expect(component.find(".chq-btn-dg").text()).toEqual("Delete");
});

test("passes on contentRef", () => {
  const contentRef = element => {
    contentRef.current = element;
  };

  mount(<Confirm startOpen contentRef={contentRef} trigger={() => {}} />);

  expect(contentRef.current).not.toBe(undefined);
});
