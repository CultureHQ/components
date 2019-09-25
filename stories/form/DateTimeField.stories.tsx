import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, date, text } from "@storybook/addon-knobs";

import { DateTimeField, Form, Panel } from "../../src/components";

const Container = (props: Omit<React.ComponentProps<typeof DateTimeField>, "offset">) => {
  const [offset, setOffset] = useState<number>(() => (
    -new Date().getTimezoneOffset()
  ));

  const onOffsetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(parseInt(event.target.value, 10));
  };

  return (
    <Panel>
      <Panel.Body>
        <Form onSubmit={() => {}}>
          <DateTimeField {...props} offset={offset} />
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
      required: boolean("required", false)
    };

    const valueKnob = date("value", undefined);
    const value = valueKnob ? new Date(valueKnob).toISOString() : undefined;

    return <Container {...props} value={value}>{children}</Container>;
  })
  .add("autoFocus", () => (
    <Container name="datetime" autoFocus>DateTime</Container>
  ))
  .add("required", () => (
    <Container name="datetime" required>DateTime</Container>
  ))
  .add("validator", () => {
    const validator = (value: string) => {
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
