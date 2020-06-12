import React, { useEffect, useState } from "react";

import SelectField from "./SelectField";
import { StringField } from "./FormFields";
import { useForm } from "./Form";

export type Timezone = {
  label: string;
  value: string;
  offset: number;
};

type TimezoneFieldProps = Omit<React.ComponentProps<typeof StringField>, "onChange" | "validator"> & {
  onChange?: (value: null | string) => void;
  onOffsetChange?: (offset: number) => void;
  validator?: (value: null | string) => null | string;
};

const useTimezones = () => {
  const [timezones, setTimezones] = useState<Timezone[] | null>(null);

  useEffect(
    () => {
      let cancelled = false;

      import("../../timezones.json")
        .then(({ default: timezonesJson }) => {
          if (!cancelled) {
            setTimezones(timezonesJson);
          }
        }).catch(() => {
          // this catch is here because in the case that you're not in an
          // environment that supports dynamic import (like jest when you're not
          // compiling vendored code) it will spam the console otherwise
        });

      return () => {
        cancelled = true;
      };
    },
    [setTimezones]
  );

  return timezones;
};

const TimezoneField: React.FC<TimezoneFieldProps> = ({ onChange, onOffsetChange, ...props }) => {
  const { values } = useForm();
  const timezones = useTimezones();

  useEffect(
    () => {
      if (timezones && onOffsetChange) {
        const { name, value } = props;
        const normal = value || values[name];

        const match = timezones.find(timezone => timezone.value === normal);
        if (match) {
          onOffsetChange(match.offset);
        }
      }
    },
    // Here we're going to explicitly ignore the rules of hooks because we only
    // want this to fire when the timezones are fetched mounts and not in
    // relation to its component props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timezones]
  );

  const handleChange = (nextValue: any) => {
    if (onChange) {
      onChange(nextValue);
    }

    if (timezones) {
      const match = timezones.find(timezone => timezone.value === nextValue);

      if (match && onOffsetChange) {
        onOffsetChange(match.offset);
      }
    }
  };

  if (!timezones) {
    return <StringField {...props} onChange={handleChange} />;
  }

  // const candidates = timezones as unknown as Timezones;
  return <SelectField {...props} onChange={handleChange} options={timezones} />;
};

export default TimezoneField;
