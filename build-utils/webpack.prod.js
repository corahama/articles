const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'production',
  output: {
    filename: 'static/[name].[fullhash].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: true,
              },
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/styles.[fullhash].css'
    }),
    new webpack.DefinePlugin({
      SERVICE_URL: JSON.stringify(''),
    }),
  ],
};

module.exports = config;
