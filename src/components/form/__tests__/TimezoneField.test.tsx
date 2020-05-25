import React from "react";
import { render } from "@testing-library/react";

import TimezoneField, { Timezone } from "../TimezoneField";
import timezones from "../../../timezones.json";

test("waits for timezones before switching to a select", async () => {
  const { findByLabelText, getByRole } = render(
    <TimezoneField name="timezone">
      Timezones!
    </TimezoneField>
  );

  expect(getByRole("textbox")).toBeTruthy();
  await findByLabelText("Value");
});

test("fires onOffsetChange when the component has fetched the timezones", async () => {
  const onOffsetChange = jest.fn();
  const { findByLabelText, getByLabelText } = render(
    <TimezoneField name="timezone" value="America/New_York" onOffsetChange={onOffsetChange}>
      Timezones!
    </TimezoneField>
  );

  await findByLabelText("Value");

  const match = timezones.find(timezone => timezone.value === "America/New_York");
  expect(match).not.toBe(null);

  const { label, offset } = match as Timezone;
  expect((getByLabelText("Value") as HTMLInputElement).value).toEqual(label);
  expect(onOffsetChange).toHaveBeenCalledWith(offset);
});
