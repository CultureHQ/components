type ClassName = undefined | null | number | boolean | string | { [key: string]: boolean };

const classnames = (...options: ClassName[]) => options.reduce(
  (classes, option) => {
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
  },
  [] as string[]
).join(" ");

export default classnames;
