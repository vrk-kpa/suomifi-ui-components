const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = env => ({
  entry: path.join(__dirname, '/src/index.tsx'),
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'inline-source-map' : 'eval',
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '/dist/umd'),
    filename: 'index.js',
    library: 'suomifi-ui-components',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      // Run the typescript compilier on .ts files before webpack
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader?configFileName=./tsconfig.json',
        exclude: [/node_modules/],
      },
      // Used for global font-face imports
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // Load images with 'file-loader'.
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.tsx'],
    }),
  ],
  externals: {
    // this line is just to use the React dependency of our parent-project instead of using our own React.
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
});
