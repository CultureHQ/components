import React from "react";
import { mount } from "enzyme";

import Button from "../../buttons/Button";
import Confirm, { ConfirmDelete } from "../Confirm";
import ModalDialog from "../ModalDialog";

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
  const onOpen = jest.fn();
  const component = mount(
    <Confirm
      trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
      onOpen={onOpen}
    />
  );

  expect(onOpen).not.toHaveBeenCalled();

  component.find(Button).simulate("click");
  expect(onOpen).toHaveBeenCalled();
});

test("closes the modal the cancel button is clicked", () => {
  const component = mount(<Confirm startOpen trigger={() => {}}>Are you sure?</Confirm>);

  component.find(".chq-btn-iv").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
});

test("calls the onAccept callback and closes when the confirmation is accepted", () => {
  const onAccept = jest.fn();
  const component = mount(
    <Confirm danger onAccept={onAccept} startOpen trigger={() => {}}>
      Are you sure?
    </Confirm>
  );

  component.find(".chq-btn-dg").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
  expect(onAccept).toHaveBeenCalled();
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
