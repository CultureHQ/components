import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { date } from "@storybook/addon-knobs";

import { Calendar } from "../src/components";

const Container = ({ onChange }) => {
  const [value, setValue] = useState(null);
  const onCalendarChange = (year, month, day) => {
    setValue(new Date(year, month, day));
    onChange(year, month, day);
  };

  return <Calendar value={value} onChange={onCalendarChange} />;
};

storiesOf("Calendar", module)
  .add("default", () => (
    <Container onChange={action("onChange")} />
  ));
