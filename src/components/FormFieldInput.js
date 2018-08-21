import React from "react";
import classnames from "classnames";

const FormFieldInput = ({ className, name, label, type, onChange, value, required, displayRequired }) => (
  <label className={classnames("chq-ffd", className)} htmlFor={name}>
    <span className="chq-ffd--lb">{label}</span>
    <input
      type={type}
      id={name}
      name={name}
      onChange={onChange}
      value={value || ""}
      required={required}
    />
    {displayRequired && <p className="chq-ffd--rq">Required</p>}
  </label>
);

export default FormFieldInput;
