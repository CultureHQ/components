import React, { useState } from "react";

import { Hamburger } from "../../src";

const HamburgerContainer = ({ open: initialOpen }) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className="ham-wrap">
      <Hamburger open={open} onToggle={() => setOpen(!open)} />
      {" "}
      {open ? "Open" : "Closed"}
    </div>
  );
};

export default HamburgerContainer;
