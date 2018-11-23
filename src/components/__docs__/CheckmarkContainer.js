import React, { useState } from "react";

import Checkmark from "../Checkmark";

const CheckmarkContainer = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkmark checked={checked} onClick={setChecked}>
      This is a checkmark
    </Checkmark>
  );
};

export default CheckmarkContainer;
