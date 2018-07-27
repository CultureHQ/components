import React from "react";
import classnames from "classnames";

const Checkmark = ({ className, checked, onClick }) => (
  <button
    type="button"
    className={classnames(className, "chq-cmk", {
      "chq-cmk-ck": checked,
      "chq-cmk-cl": onClick
    })}
    onClick={onClick}
  >
    <svg viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="25" fill="none" />
      <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  </button>
);

export default Checkmark;
