import * as React from "react";

import Button from "../buttons/Button";
import { FormState, withForm } from "./Form";

type SubmitButtonProps = React.ComponentProps<typeof Button> & FormState & {
  children?: (submitting: boolean) => React.ReactNode;
};

const defaultChildren = (submitting: boolean) => (submitting ? "Submitting..." : "Submit");

const SubmitButton = ({
  children = defaultChildren,
  disabled = false,
  errors,
  submitted,
  submitting,
  values,
  onError,
  onFormChange,
  ...props
}: SubmitButtonProps) => (
  <Button {...props} disabled={disabled || submitting} type="submit">
    {children(submitting)}
  </Button>
);

export default withForm(SubmitButton);
