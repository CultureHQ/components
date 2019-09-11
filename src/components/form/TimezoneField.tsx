import * as React from "react";

import SelectField from "./SelectField";
import { StringField } from "./FormFields";
import { FormState, withForm } from "./Form";

import timezonesJSON from "../../timezones.json";

type Timezones = typeof timezonesJSON;

type TimezoneFieldProps = Omit<React.ComponentProps<typeof StringField>, "onChange"> & {
  onChange?: (value: string) => void;
  onOffsetChange?: (offset: number) => void;
};

type TimezoneFieldState = {
  timezones: null | Timezones;
};

class TimezoneField extends React.Component<TimezoneFieldProps & FormState, TimezoneFieldState> {
  private componentIsMounted = false;

  state = { timezones: null };

  componentDidMount() {
    this.componentIsMounted = true;

    import("../../timezones.json")
      .then(({ default: timezones }) => {
        if (!this.componentIsMounted) {
          return;
        }

        const { name, onOffsetChange, value, values } = this.props;
        const normal = value || values[name];

        const match = timezones.find(timezone => timezone.value === normal);
        if (match && onOffsetChange) {
          onOffsetChange(match.offset);
        }

        this.setState({ timezones });
      }).catch(() => {
        // this catch is largely here because in the case that you're not in an
        // environment that supports dynamic import (like jest when you're not
        // compiling vendored code) it will spam the console otherwise
      });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  handleChange = (value: string) => {
    const { onChange, onOffsetChange } = this.props;
    const { timezones } = this.state;

    if (onChange) {
      onChange(value);
    }

    if (timezones) {
      // This --v should not be necessary
      const candidates = timezones as unknown as Timezones;
      const match = candidates.find(timezone => timezone.value === value);

      if (match && onOffsetChange) {
        onOffsetChange(match.offset);
      }
    }
  };

  render() {
    const { onOffsetChange, ...props } = this.props;
    const { timezones } = this.state;

    if (!timezones) {
      return <StringField {...props} onChange={this.handleChange} />;
    }

    return <SelectField {...props} onChange={this.handleChange} options={timezones} />;
  }
}

export default withForm(TimezoneField);
