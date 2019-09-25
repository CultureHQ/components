import React from "react";
import { fireEvent, render } from "@testing-library/react";

import BooleanField from "../BooleanField";

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <BooleanField name="boolean" onChange={onChange}>
      Boolean!
    </BooleanField>
  );

  fireEvent.click(getByRole("button"));

  expect(onChange).toHaveBeenCalledWith(true);
});

test("works with initial values", () => {
  const { getByRole } = render(
    <BooleanField name="boolean" value>
      Boolean!
    </BooleanField>
  );

  expect(getByRole("button").classList).toContain("chq-cmk-ck");

  fireEvent.click(getByRole("button"));
});
