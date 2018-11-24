import React, { Component } from "react";

import SelectField from "./SelectField";
import { StringField } from "./FormFields";

class TimezoneField extends Component {
  state = { timezones: null };

  componentDidMount() {
    this.componentIsMounted = true;

    return import("../../timezones.json").then(module => {
      if (this.componentIsMounted) {
        this.setState({ timezones: module.default });
      }
    }).catch(() => {
      // this catch is largely here because in the case that you're not in an
      // environment that supports dynamic import (like jest when you're not
      // compiling vendored code) it will spam the console otherwise
    });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  render() {
    const { timezones } = this.state;

    if (!timezones) {
      return <StringField {...this.props} />;
    }

    return <SelectField {...this.props} options={timezones} />;
  }
}

export default TimezoneField;
