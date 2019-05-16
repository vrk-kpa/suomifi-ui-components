const path = require('path');
const glob = require('glob');

const manuallyAddedComponents =
  'Block|Button|Heading|Block|Paragraph|Text|Breadcrumb|Dropdown';

const getComponent = ({ name, underName }) =>
  path.resolve(
    __dirname,
    `../src/core/${!!underName ? underName : name}/${name}.tsx`,
  );

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
            getComponent({ name: 'Block' }),
            getComponent({ name: 'Button' }),
            getComponent({ name: 'Heading' }),
          ],
          sections: [
            {
              name: 'Text',
              components: [
                getComponent({ name: 'Text' }),
                getComponent({ name: 'Paragraph' }),
              ],
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
          sections: [
            {
              name: 'Breadcrumb',
              components: [
                getComponent({ name: 'Breadcrumb' }),
                getComponent({
                  underName: 'Breadcrumb',
                  name: 'BreadcrumbLink',
                }),
              ],
            },
            {
              name: 'Dropdown',
              components: [
                getComponent({ name: 'Dropdown' }),
                getComponent({
                  underName: 'Dropdown',
                  name: 'DropdownItem',
                }),
              ],
            },
          ],
        },
      ],
      sectionDepth: 2,
    },
  ],
};
