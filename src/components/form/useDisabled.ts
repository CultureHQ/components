import { useEffect } from "react";
import { useForm } from "./Form";

const useDisabled = (name: string, disabled: boolean | undefined): void => {
  const { onFieldDisabledChange } = useForm();

  useEffect(
    () => {
      onFieldDisabledChange(name, disabled);
    },
    [onFieldDisabledChange, name, disabled]
  );
};

export default useDisabled;
