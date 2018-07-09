const path = require("path");

module.exports = {
  output: {
    filename: "example.js"
  },
  entry: path.join(__dirname, "example", "app.js"),
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "example")
  },
  mode: "development"
};
