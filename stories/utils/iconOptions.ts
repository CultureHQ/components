import icons from "../../src/icons.json";
import { IconName } from "../../src/components/Icon";

const iconOptions: Partial<{ [K in IconName]: IconName }> = {};

Object.keys(icons).forEach(key => {
  const icon = key as IconName;
  iconOptions[icon] = icon;
});

export default iconOptions;
