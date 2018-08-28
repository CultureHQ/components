const classnames = (...options) => options.reduce((classes, option) => {
  if (!option) {
    return classes;
  }

  if (typeof option === "string") {
    return [...classes, option];
  }

  if (typeof option === "object") {
    return classes.concat(Object.keys(option).filter(key => option[key]));
  }

  return classes;
}, []).join(" ");

export default classnames;
