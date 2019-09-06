import * as React from "react";

import Checkmark from "../Checkmark";
import classnames from "../../classnames";
import { FormState, withForm } from "./Form";

type BooleanFieldProps = {
  children: React.ReactNode;
  className?: string;
  name: string;
  onChange?: (value: boolean) => {};
  value?: boolean | null;
};

class BooleanField extends React.Component<BooleanFieldProps & FormState, {}> {
  componentDidMount() {
    const { name, value, values } = this.props;
    const normal = value || (values[name] as boolean);

    if (normal === undefined || normal === null) {
      this.handleClick(false);
    }
  }

  handleClick = (checked: boolean) => {
    const { name, onChange, onFormChange } = this.props;

    if (onChange) {
      onChange(checked);
    }

    onFormChange(name, checked);
  };

  render() {
    const { children, className, name, value, values } = this.props;
    const normal = value || (values[name] as boolean);

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
