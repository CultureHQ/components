const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ],
        exclude: /node_modules/
      }
    ]
  },
  target: "node",
  mode: "production",
  plugins: [new MiniCssExtractPlugin()]
};
