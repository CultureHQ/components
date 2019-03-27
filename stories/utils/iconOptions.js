import icons from "../../src/icons.json";

const iconOpts = Object.keys(icons).reduce(
  (accum, icon) => ({ ...accum, [icon]: icon }), { none: null }
);

export default iconOpts;
