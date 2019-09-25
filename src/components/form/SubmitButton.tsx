import React from "react";

import Button from "../buttons/Button";
import { useForm } from "./Form";

type SubmitButtonProps = Omit<React.ComponentProps<typeof Button>, "disabled"> & {
  children?: (submitting: boolean) => React.ReactNode;
  disabled?: boolean;
};

const message = (submitting: boolean) => (submitting ? "Submitting..." : "Submit");

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children = message,
  disabled = false,
  ...props
}) => {
  const { submitting } = useForm();

  return (
    <Button {...props} disabled={disabled || submitting} type="submit">
      {children(submitting)}
    </Button>
  );
};

export default SubmitButton;
