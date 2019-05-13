const path = require('path');
const glob = require('glob');

const manuallyAddedComponents = 'Block|Button|Heading|Block|Paragraph|Text';

const getComponent = name =>
  path.resolve(__dirname, `../src/core/${name}/${name}.tsx`);

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
          components: [
            getComponent('Block'),
            getComponent('Button'),
            getComponent('Heading'),
          ],
          sections: [
            {
              name: 'Text',
              components: [getComponent('Text'), getComponent('Paragraph')],
            },
          ],
        },
        {
          name: 'Patterns',
          content: './.styleguidist/patterns.md',
          components: () => {
            return glob.sync(
              path.resolve(
                __dirname,
                `../src/core/!(${manuallyAddedComponents})/*.tsx`,
              ),
            );
          },
        },
      ],
      sectionDepth: 2,
    },
  ],
};
