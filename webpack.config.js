const path = require('path');

module.exports = env => ({
  entry: './src/index.tsx',
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'inline-source-map' : 'eval',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    library: 'suomifi-ui-components',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      // Run the typescript compilier on .ts files before webpack
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  externals: {
    // this line is just to use the React dependency of our parent-project instead of using our own React.
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }
});
