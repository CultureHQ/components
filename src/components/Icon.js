import React from "react";

import icons from "../icons.json";

const Icon = ({ icon, ...props }) => (
  <svg width="22px" height="22px" viewBox="0 0 1024 1024" {...props}>
    <path d={icons[icon].join(" ")} />
  </svg>
);

export default Icon;
