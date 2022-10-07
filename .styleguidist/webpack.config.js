const path = require('path');

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'inline-source-map' : 'eval',
  devServer: {
    injectClient: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      fs: false,
    },
  },
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

