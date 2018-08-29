import React, { Component, Fragment } from "react";

import classnames from "../classnames";

class Checkmark extends Component {
  handleClick = () => {
    const { checked, onClick } = this.props;

    onClick(!checked);
  };

  render() {
    const { children, className, checked, onClick } = this.props;

    return (
      <button
        type="button"
        className={classnames("chq-cmk", className, {
          "chq-cmk-ck": checked,
          "chq-cmk-cl": onClick
        })}
        onClick={onClick ? this.handleClick : null}
      >
        <svg viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="25" fill="none" />
          <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        {children && <Fragment>{" "}{children}</Fragment>}
      </button>
    );
  }
}

export default Checkmark;
