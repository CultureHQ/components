import React from "react";
import { mount } from "enzyme";

import TimezoneField from "../TimezoneField";

test("waits for timezones before switching to a select", async () => {
  const component = mount(<TimezoneField name="timezone" />);

  expect(component.find("StringField")).toHaveLength(1);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find("SelectField")).toHaveLength(1);
  component.unmount();
});
