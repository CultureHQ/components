import React, { useState, useCallback } from "react";

import Calendar from "../Calendar";

const CalendarContainer = () => {
  const [value, setValue] = useState(new Date());
  const onChange = useCallback((year, month, day) => setValue(new Date(year, month, day)));

  return <Calendar value={value} onChange={onChange} />;
};

export default CalendarContainer;
