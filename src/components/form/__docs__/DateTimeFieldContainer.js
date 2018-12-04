import React, { useState, useCallback } from "react";

import DateTimeField from "../DateTimeField";
import Form from "../Form";
import Panel from "../../Panel";

const getStdTimezoneOffset = () => {
  const date = new Date();

  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);

  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

const DateTimeFieldContainer = () => {
  const [offset, setOffset] = useState(-getStdTimezoneOffset());
  const onOffsetChange = useCallback(({ target: { value } }) => setOffset(value));

  return (
    <Panel>
      <Panel.Body>
        <Form>
          <DateTimeField name="datetime" offset={offset}>DateTime</DateTimeField>
        </Form>
      </Panel.Body>
      <Panel.Footer>
        <label htmlFor="offset">
          Offset
          {" "}
          <input
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

export default DateTimeFieldContainer;
