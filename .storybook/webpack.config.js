const path = require("path");

module.exports = async ({ config, mode }) => {
  config.resolve.extensions.push(".ts", ".tsx");

  config.module.rules.push({
    test: /\.tsx?/,
    loaders: [
      require.resolve("awesome-typescript-loader"),
      require.resolve('react-docgen-typescript-loader')
    ],
    include: path.resolve(__dirname, "../")
  });

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../"),
  });

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve("@storybook/addon-storysource/loader")],
    enforce: "pre",
  });

  return config;
};
