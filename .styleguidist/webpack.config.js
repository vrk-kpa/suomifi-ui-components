const path = require('path');
const webpack = require('webpack');

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-map' : 'eval',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 30000,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-is)[\\/]/,
          name: 'vendor.react',
          priority: 20,
        },
        styleguidistVendor: {
          test: /[\\/]node_modules[\\/](react-styleguidist|buble)[\\/]/,
          name: 'vendor.styleguidist',
          priority: 15,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor.libs',
          priority: 10,
        },
      },
    },
  },
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
