import React, { useState } from "react";

import Calendar from "../Calendar";

const CalendarContainer = () => {
  const [value, setValue] = useState(new Date());

  return <Calendar value={value} onChange={setValue} />;
};

export default CalendarContainer;
