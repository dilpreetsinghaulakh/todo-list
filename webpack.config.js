const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|webp|jpeg|jpg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo Dump",
      filename: "index.html",
      template: "./src/template.html",
    }),
    new FaviconsWebpackPlugin({
      appName: "Todo Dump",
      lang: "en-US",
      appleStatusBarStyle: "black-translucent",
      orientation: "landscape",
      appDescription: 'Pure JavaScript Todo List',
      developerName: 'Dilpreet Singh',
      logo: "./src/assets/favicon.svg",
      mode: "webapp",
    }),
  ],
};
