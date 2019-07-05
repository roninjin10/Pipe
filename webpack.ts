import path from "path";
import webpack from "webpack";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { IS_PROD } from "./src/utils/env.utils";

const maybeMinify = IS_PROD
  ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundentAtributes: true,
        minifyCSS: true
      }
    }
  : {};

const htmlPlugin = new HtmlWebpackPlugin({
  inject: true,
  title: "HTML Webpack Plugin",
  template: path.resolve(__dirname, "./client/index.html"),
  ...maybeMinify
});

const envPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});

const SHARED_PLUGINS: webpack.Plugin[] = [envPlugin, htmlPlugin];

const DEV_PLUGINS: webpack.Plugin[] = [...SHARED_PLUGINS];
const PROD_PLUGINS: webpack.Plugin[] = [
  ...SHARED_PLUGINS,
  new UglifyJsPlugin()
];

const PLUGINS: webpack.Plugin[] = IS_PROD ? PROD_PLUGINS : DEV_PLUGINS;

export const webpackConfig: webpack.Configuration = {
  mode: IS_PROD ? "production" : "development",
  bail: IS_PROD,
  entry: {
    main: path.resolve(__dirname, "./client/index.tsx")
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "scss", "css"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: "ts-loader"
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader", "sass-loader?sourceMap"]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "source-map-loader"
      }
    ]
  },
  plugins: PLUGINS
};
