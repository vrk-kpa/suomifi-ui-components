const path = require('path');
const glob = require('glob');

const primitiveComponents = 'Block|Button|Heading|Text';

module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: './.styleguidist/introduction.md',
      sections: [
        {
          name: 'Colors',
          content: './.styleguidist/colors.md',
        },
        {
          name: 'Typography',
          content: './.styleguidist/typography.md',
        },
        {
          name: 'Spacing',
          content: './.styleguidist/spacing.md',
        },
      ],
      sectionDepth: 1,
    },
    {
      name: 'Components',
      content: './.styleguidist/components.md',
      sections: [
        {
          name: 'Primitive',
          content: './.styleguidist/primitive.md',
          components: () => {
            return glob.sync(
              path.resolve(
                __dirname,
                `../src/core/+(${primitiveComponents})/*.tsx`,
              ),
            );
          },
        },
        {
          name: 'Patterns',
          content: './.styleguidist/patterns.md',
          components: () => {
            return glob.sync(
              path.resolve(
                __dirname,
                `../src/core/!(${primitiveComponents})/*.tsx`,
              ),
            );
          },
        },
      ],
      sectionDepth: 2,
    },
  ],
};
