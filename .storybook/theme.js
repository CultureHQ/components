import { create } from "@storybook/theming";

export default create({
  base: "light",
  title: "CultureHQ",

  colorPrimary: "#8cb4d6",
  colorSecondary: "#6a89af",

  // UI
  appBg: "white",
  appContentBg: "#f7f7f7",
  appBorderColor: "#aaa",
  appBorderRadius: 4,

  // Typography
  fontBase: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  fontCode: "monospace",

  // Text colors
  textColor: "#222",
  textInverseColor: "#9c9fa7",

  // Toolbar default and active colors
  barTextColor: "#222",
  barSelectedColor: "black",
  barBg: "#8cb4d6",

  // Form colors
  inputBg: "white",
  inputBorder: "#eaeaea",
  inputTextColor: "#222",
  inputBorderRadius: 4,

  brandTitle: "@culturehq/components",
  brandUrl: "https://engineering.culturehq.com/components",
  brandImage: "https://assets.culturehq.com/CultureHQ-logo.png",
});
