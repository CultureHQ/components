import React, { useCallback, useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, date, text } from "@storybook/addon-knobs";

import { DateTimeField, Form, Panel } from "../../src/components";

const getStdTimezoneOffset = () => {
  const tester = new Date();

  const jan = new Date(tester.getFullYear(), 0, 1);
  const jul = new Date(tester.getFullYear(), 6, 1);

  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

const Container = ({ children, ...props }) => {
  const [offset, setOffset] = useState(-getStdTimezoneOffset());
  const onOffsetChange = useCallback(
    ({ target: { value } }) => setOffset(value),
    [setOffset]
  );

  return (
    <Panel>
      <Panel.Body>
        <Form>
          <DateTimeField {...props} offset={offset}>
            {children}
          </DateTimeField>
        </Form>
      </Panel.Body>
      <Panel.Footer>
        <label htmlFor="offset">
          Offset
          {" "}
          <input
            aria-label="Offset"
            id="offset"
            name="offset"
            type="number"
            value={offset}
            onChange={onOffsetChange}
          />
        </label>
      </Panel.Footer>
    </Panel>
  );
};

storiesOf("Form/DateTimeField", module)
  .add("default", () => {
    const children = text("children", "DateTime");
    const props = {
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      name: text("name", "datetime"),
      required: boolean("required", false),
      value: date("value", null)
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("autoFocus", () => (
    <Container name="datetime" autoFocus>DateTime</Container>
  ))
  .add("required", () => (
    <Container name="datetime" required>DateTime</Container>
  ))
  .add("validator", () => {
    const validator = value => {
      if (value >= "2019") {
        return null;
      }
      return "Value cannot be before 2019.";
    };

    return (
      <Container name="datetime" required validator={validator}>
        DateTime
      </Container>
    );
  });
