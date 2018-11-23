const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "index.js"
  },
  entry: path.join(__dirname, "docs", "app.js"),
  resolve: {
    extensions: [".js", ".json", ".css", ".scss", ".mdx"]
  },
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
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.mdx$/,
        use: [
          {
            loader: "@mapbox/jsxtreme-markdown-loader",
            options: { precompile: true }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    historyApiFallback: true
  }
};
