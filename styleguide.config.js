const path = require('path');

// Filter props from styleguidist that don't have description in interface or are from react typings
const propFilter = prop => {
  if (prop.description.length === 0) {
    return false;
  }
  if (prop.parent == null) {
    return true;
  }
  return prop.parent.fileName.indexOf('node_modules/@types/react') < 0;
};

module.exports = {
  title: 'Suomifi-ui-components',
  components: 'src/core/**/[A-Z]*.tsx',
  ignore: ['**/*basestyles.tsx', '**/*baseStyles.tsx', '**/*test.tsx'],
  webpackConfig: require('./webpack.config.js'),
  require: [path.join(__dirname, '.styleguidist/styleguidist.require.js')],
  assetsDir: path.join(__dirname, '.styleguidist/assets'),
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: require('react-docgen-typescript').withDefaultConfig({
    propFilter,
  }).parse,
  exampleMode: 'expand',
  usageMode: 'expand',
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  getExampleFilename: componentPath => componentPath.replace(/\.tsx?$/, '.md'),
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&display=swap',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Source Sans Pro", sans-serif',
    },
  },
  styles: require('./.styleguidist/styleguidist.styles.js'),
  sections: require('./.styleguidist/styleguidist.sections.js').sections,
};
