import React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import TimezoneField from "../TimezoneField";

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
