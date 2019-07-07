import path from 'path'
import webpack from 'webpack'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { IS_PROD } from './src/utils/constants'

const getHtmlPlugin = () => {
  const maybeMinify = IS_PROD
    ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundentAtributes: true,
          minifyCSS: true,
        },
      }
    : {}

  return new HtmlWebpackPlugin({
    inject: true,
    title: 'HTML Webpack Plugin',
    template: path.resolve(__dirname, './src/client/public/index.html'),
    ...maybeMinify,
  })
}

const getPlugins = () => {
  const maybeUglifyPlugin = IS_PROD ? [new UglifyJsPlugin()] : []
  const htmlPlugin = getHtmlPlugin()
  const envPlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  })

  return [envPlugin, htmlPlugin, ...maybeUglifyPlugin]
}

export const webpackConfig: webpack.Configuration = {
  mode: IS_PROD ? 'production' : 'development',
  bail: IS_PROD,
  entry: {
    main: path.resolve(__dirname, 'src/client/index.tsx'),
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss', 'css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader', 'sass-loader?sourceMap'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: getPlugins(),
}
