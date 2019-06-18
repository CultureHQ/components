import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Calendar } from "../src/components";

const Container = ({ onChange }) => {
  const [value, setValue] = useState({ year: null, month: null, day: null });
  const onCalendarChange = (year, month, day) => {
    setValue({ year, month, day });
    onChange(year, month, day);
  };

  return (
    <Calendar
      year={value.year}
      month={value.month}
      day={value.day}
      onChange={onCalendarChange}
    />
  );
};

storiesOf("Calendar", module)
  .add("default", () => (
    <Container onChange={action("onChange")} />
  ));
