import React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import TimezoneField from "../TimezoneField";
import timezones from "../../../timezones.json";

test("waits for timezones before switching to a select", async () => {
  const { container, getByLabelText, getByRole } = render(
    <TimezoneField name="timezone">
      Timezones!
    </TimezoneField>
  );

  expect(getByRole("textbox")).toBeTruthy();

  await waitForDomChange({ container });

  expect(getByLabelText("Value")).toBeTruthy();
});

test("fires onOffsetChange when the component has fetched the timezones", async () => {
  const onOffsetChange = jest.fn();
  const { container, getByLabelText } = render(
    <TimezoneField name="timezone" value="America/New_York" onOffsetChange={onOffsetChange}>
      Timezones!
    </TimezoneField>
  );

  await waitForDomChange({ container });

  const { label, offset } = timezones.find(timezone => timezone.value === "America/New_York");
  expect(getByLabelText("Value").value).toEqual(label);
  expect(onOffsetChange).toHaveBeenCalledWith(offset);
});
