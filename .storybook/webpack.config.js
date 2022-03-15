const path = require("path");
const includePath = path.resolve(__dirname, "../");

module.exports = async ({ config, mode }) => {
  config.resolve.extensions.push(".ts", ".tsx");

  config.module.rules.push({
    test: /\.tsx?/,
    use: [
      { loader: require.resolve("awesome-typescript-loader") },
      { loader: require.resolve("react-docgen-typescript-loader") }
    ],
    include: includePath
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      { loader: "sass-loader" }
    ],
    include: includePath
  });

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    use: [
      { loader: require.resolve("@storybook/source-loader") }
    ],
    enforce: "pre",
  });

  return config;
};
