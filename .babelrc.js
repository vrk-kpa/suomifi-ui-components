module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    ['istanbul', { exclude: ['**/*.test.tsx', 'dist'] }],
    '@babel/transform-react-jsx'
  ]
};
