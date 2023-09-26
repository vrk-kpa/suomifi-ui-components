const path = require('path');
const packagejson = require('./package.json');

// Filter props from styleguidist that don't have description in interface or are from react typings
const propFilter = (prop) => {
  if (prop.description.length === 0) {
    return false;
  }
  // if (['margin', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'].includes(prop.name)) {
  //   return false;
  // }
  if (prop.parent == null) {
    return true;
  }
  return prop.parent.fileName.indexOf('node_modules/@types/react') < 0;
};

const requireFiles = (axe) => [
  ...(!!axe
    ? [path.join(__dirname, '.styleguidist/styleguidist.require.axe.js')]
    : []),
  path.join(__dirname, '.styleguidist/styleguidist.require.js'),
];

const buildDirectory = (buildType) =>
  buildType === 'ASSETS' ? 'tmp' : 'styleguide';

module.exports = {
  title: `Suomifi-ui-components ${packagejson.version}`,
  components: 'src/core/**/[A-Z]*.tsx',
  ignore: ['**/*basestyles.tsx', '**/*baseStyles.tsx', '**/*test.tsx'],
  webpackConfig: require('./.styleguidist/webpack.config.js'),
  require: requireFiles(!!process.env.AXE),
  assetsDir: path.join(__dirname, '.styleguidist/assets'),
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: require('react-docgen-typescript').withDefaultConfig({
    propFilter,
  }).parse,
  moduleAliases: {
    'suomifi-ui-components': path.resolve(__dirname, 'src'),
    'rsg-components/ComponentsList/ComponentsListRenderer': path.resolve(
      __dirname,
      'node_modules/react-styleguidist/lib/client/rsg-components/ComponentsList/ComponentsListRenderer',
    ),
  },
  exampleMode: 'expand',
  usageMode: 'expand',
  pagePerSection: true,
  tocMode: 'collapse',
  skipComponentsWithoutExample: false,
  getExampleFilename: (componentPath) =>
    componentPath.replace(/\.tsx?$/, '.md'),
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Source Sans Pro", sans-serif',
    },
  },
  styleguideDir: buildDirectory(process.env.BUILD_TYPE),
  styles: require('./.styleguidist/styleguidist.styles.js'),
  sections: require('./.styleguidist/styleguidist.sections.js').sections,
  styleguideComponents: {
    StyleGuideRenderer: path.join(
      __dirname,
      '.styleguidist/StyleGuideRenderer',
    ),
    ComponentsList: path.join(__dirname, '.styleguidist/ComponentsList'),
  },
};
