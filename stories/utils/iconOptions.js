import icons from "../../src/icons.json";

const iconOptions = Object.keys(icons).reduce(
  (accum, icon) => ({ ...accum, [icon]: icon }), { none: null }
);

export default iconOptions;
