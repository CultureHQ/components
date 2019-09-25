import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Calendar } from "../src/components";

type CalendarState = Pick<React.ComponentProps<typeof Calendar>, "year" | "month" | "day">;
type ContainerProps = Pick<React.ComponentProps<typeof Calendar>, "onChange">;

const Container: React.FC<ContainerProps> = ({ onChange }) => {
  const [value, setValue] = useState<CalendarState>({ year: null, month: null, day: null });
  const onCalendarChange = (year: number, month: number, day: number) => {
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
