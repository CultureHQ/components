import React, { Component } from "react";

import Checkmark from "../Checkmark";
import classnames from "../../classnames";
import { withForm } from "./Form";

class BooleanField extends Component {
  componentDidMount() {
    const { name, value, values } = this.props;
    const normal = value || values[name];

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
    const normal = value || values[name];

    return (
      <div className={classnames("chq-ffd", className)}>
        <Checkmark checked={normal} onClick={this.handleClick}>
          {children}
        </Checkmark>
      </div>
    );
  }
}

BooleanField.defaultProps = {
  onChange: () => {},
  onFormChange: () => {},
  values: {}
};

export default withForm(BooleanField);
