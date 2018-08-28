import React from "react";

import Button from "./Button";

const defaultButtonText = submitting => submitting ? "Submitting..." : "Submit";

const SubmitButton = ({ children = defaultButtonText, disabled, submitting, ...props }) => (
  <Button {...props} disabled={disabled || submitting} type="submit">
    {children(submitting)}
  </Button>
);

export default SubmitButton;
