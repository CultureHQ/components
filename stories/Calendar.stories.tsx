import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Calendar } from "../src/components";

type CalendarState = Pick<React.ComponentProps<typeof Calendar>, "year" | "month" | "day">;
type ContainerProps = Pick<React.ComponentProps<typeof Calendar>, "onChange" | "range">;

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

const RangeContainer: React.FC<ContainerProps> = ({ onChange, range }) => {
  const [value, setValue] = useState<CalendarState>({ year: null, month: null, day: null });
  const [value2, setValue2] = useState<CalendarState>({ year: null, month: null, day: null });
  const onCalendarChange = (year: number, month: number, day: number, isRange?: boolean) => {
    if (value.day === null) {
      setValue({ year, month, day });
      onChange(year, month, day, isRange);
    } else if (isRange) {
      if (value2.day === null) {
        setValue2({ year, month, day });
        onChange(year, month, day, isRange);
      } else {
        setValue2({ year: null, month: null, day: null });
        setValue({ year, month, day });
        onChange(year, month, day, isRange);
      }
    } else {
      // regular calendar
      setValue({ year, month, day });
      onChange(year, month, day, isRange);
    }
  };

  return (
    <Calendar
      year={value.year}
      month={value.month}
      day={value.day}
      year2={value2.year}
      month2={value2.month}
      day2={value2.day}
      onChange={onCalendarChange}
      range={range}
    />
  );
};

storiesOf("Calendar", module)
  .add("default", () => (
    <Container onChange={action("onChange")} />
  ))
  .add("range", () => (
    <RangeContainer onChange={action("onChange")} range />
  ));
