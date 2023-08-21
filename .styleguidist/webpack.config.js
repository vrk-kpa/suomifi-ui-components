const path = require('path');
const webpack = require('webpack');

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'inline-source-map' : 'eval',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      fs: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BUILD_TYPE': JSON.stringify(process.env.BUILD_TYPE),
      'process.env.BASE_PATH': JSON.stringify(process.env.BASE_PATH),
    }),
  ],
  module: {
    rules: [
      // Run the typescript compilier on .ts files before webpack
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: '.styleguidist/styleguideTsconfig.json',
        },
        exclude: [/node_modules/],
      },
      // Used for global font-face imports
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});
