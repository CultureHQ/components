import React from "react";

import Button from "../buttons/Button";
import { withForm } from "./Form";

const defaultButtonText = submitting => (submitting ? "Submitting..." : "Submit");

const SubmitButton = ({
  children = defaultButtonText, disabled, errors, submitted, submitting, values,
  onError, onFormChange, ...props
}) => (
  <Button {...props} disabled={disabled || submitting} type="submit">
    {children(submitting)}
  </Button>
);

export default withForm(SubmitButton);
