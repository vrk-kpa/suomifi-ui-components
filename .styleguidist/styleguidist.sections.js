const path = require('path');
const glob = require('glob');

const primitiveComponents = [
  'Block',
  'Button',
  'Heading',
  'Link',
  'Icon',
  ['Form', 'TextInput'],
  ['Form', 'Toggle'],
  ['Form', 'SearchInput'],
];

const getComponent = ({ name, underName }) =>
  path.resolve(
    __dirname,
    `../src/core/${!!underName ? underName : name}/${name}.tsx`,
  );
const getComponents = arr =>
  arr.map(component =>
    Array.isArray(component)
      ? getComponent({
          name: component[1],
          underName: `${component[0]}/${component[1]}`,
        })
      : getComponent({ name: component }),
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
          components: getComponents(primitiveComponents),
          sections: [
            {
              name: 'Text',
              components: getComponents(['Text', 'Paragraph']),
            },
          ],
        },
        {
          name: 'Patterns',
          content: './.styleguidist/patterns.md',
          sections: [
            {
              name: 'Breadcrumb',
              components: getComponents([
                'Breadcrumb',
                ['Breadcrumb', 'BreadcrumbLink'],
              ]),
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
            {
              name: 'Menu',
              components: [
                getComponent({ name: 'Menu' }),
                // getComponent({
                //   underName: 'Menu',
                //   name: 'MenuItem',
                // }),
                getComponent({
                  underName: 'Menu',
                  name: 'MenuItemLanguage',
                }),
                getComponent({
                  underName: 'Menu',
                  name: 'MenuLinkLanguage',
                }),
              ],
            },
            {
              name: 'Panel',
              components: [
                getComponent({ name: 'Panel' }),
                getComponent({
                  underName: 'Panel',
                  name: 'PanelExpansion',
                }),
                getComponent({
                  underName: 'Panel',
                  name: 'PanelExpansionGroup',
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
