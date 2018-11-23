import React, { Component } from "react";

import Checkmark from "../Checkmark";
import classnames from "../../classnames";
import { withForm } from "./Form";

class BooleanField extends Component {
  static defaultProps = {
    onChange: () => {},
    onFormChange: () => {},
    values: {}
  };

  componentDidMount() {
    const { name, value, values } = this.props;
    const normal = values[name] || value;

    if (normal === undefined || normal === null) {
      this.handleClick(false);
    }
  }

  handleClick = checked => {
    const { name, onChange, onFormChange } = this.props;

    onChange(checked);
    onFormChange(name, checked);
  };

  render() {
    const { children, className, name, value, values } = this.props;
    const normal = values[name] || value;

    return (
      <div className={classnames("chq-ffd", className)}>
        <Checkmark checked={normal} onClick={this.handleClick}>
          {children}
        </Checkmark>
      </div>
    );
  }
}

export default withForm(BooleanField);
