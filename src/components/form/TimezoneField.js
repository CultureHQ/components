import React, { Component } from "react";

import SelectField from "./SelectField";
import { StringField } from "./FormFields";
import { withForm } from "./Form";

class TimezoneField extends Component {
  static defaultProps = {
    onChange: () => {},
    onOffsetChange: () => {}
  };

  state = { timezones: null };

  componentDidMount() {
    this.componentIsMounted = true;

    return import("../../timezones.json").then(({ default: timezones }) => {
      if (!this.componentIsMounted) {
        return;
      }

      const { name, onOffsetChange, value, values } = this.props;
      const normal = value || values[name];

      const match = timezones.find(timezone => timezone.value === normal);
      if (match) {
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

  handleChange = value => {
    const { onChange, onOffsetChange } = this.props;
    const { timezones } = this.state;

    onChange(value);

    if (timezones) {
      const match = timezones.find(timezone => timezone.value === value);
      if (match) {
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
