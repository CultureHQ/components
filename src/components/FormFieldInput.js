import React from "react";

import classnames from "../classnames";

const FormFieldInput = ({
  className, name, label, type, value, required, error, addon,
  onBlur, onChange, onFocus
}) => (
  <label className={classnames("chq-ffd", className)} htmlFor={name}>
    <span className="chq-ffd--lb">{label}</span>
    {addon && <span className="chq-ffd--ad">{addon}</span>}
    <input
      type={type}
      id={name}
      name={name}
      value={value || ""}
      required={required}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
    {error && <p className="chq-ffd--rq">{error}</p>}
  </label>
);

export default FormFieldInput;
