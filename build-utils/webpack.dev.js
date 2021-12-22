const webpack = require('webpack');

const port = process.env.PORT || 3000;

const config = {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].[fullhash].js'
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: true,
              },
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      SERVICE_URL: JSON.stringify('http://localhost:8000'),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: false,
    hot: true
  }
};

module.exports = config;