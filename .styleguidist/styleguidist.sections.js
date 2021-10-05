const path = require('path');
const glob = require('glob');

const primitiveComponents = [
  'Block',
  'Button',
  'Heading',
  'VisuallyHidden',
  ['Form', 'TextInput'],
  ['Form', 'SearchInput'],
  ['Form', 'Checkbox'],
  ['Form', 'Textarea'],
];

const getComponent = ({ name, underName }) =>
  path.resolve(
    __dirname,
    `../src/core/${!!underName ? underName : name}/${name}.tsx`,
  );
const getComponents = (arr) =>
  arr.map((component) =>
    Array.isArray(component)
      ? getComponent({
          name: component[1],
          underName: `${component[0]}/${component[1]}`,
        })
      : getComponent({ name: component }),
  );
const getComponentWithVariants = (component) => (variants) =>
  [
    getComponent({ name: component }),
    ...variants.map((variant) =>
      getComponent({ underName: component, name: variant }),
    ),
  ];

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
        {
          name: 'Theme',
          content: './.styleguidist/theme.md',
          sections: [
            {
              name: 'SuomifiThemeProvider',
              components: getComponent({
                underName: 'theme/SuomifiThemeProvider',
                name: 'SuomifiThemeProvider',
              }),
            },
            {
              name: 'Default Theme',
              content: './.styleguidist/themevalues.md',
            },
          ],
        },
      ],
      sectionDepth: 2,
      expand: true,
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
              name: 'Toggle',
              components: getComponentWithVariants('Form/Toggle')([
                'ToggleButton/ToggleButton',
                'ToggleInput/ToggleInput',
              ]),
            },
            {
              name: 'Text',
              components: getComponents(['Text', 'Paragraph']),
            },
            {
              name: 'RadioButton',
              components: getComponentWithVariants('Form/RadioButton')([
                'RadioButton',
                'RadioButtonGroup',
              ]),
            },
            {
              name: 'Link',
              components: getComponentWithVariants('Link')([
                'Link/Link',
                'SkipLink/SkipLink',
                'ExternalLink/ExternalLink',
              ]),
            },
            {
              name: 'Chip',
              components: getComponentWithVariants('Chip')([
                'Chip/Chip',
                'StaticChip/StaticChip',
              ]),
            },
            {
              name: 'Icon',
              components: getComponents(['Icon', 'StaticIcon']),
            },
            {
              name: 'MultiSelect',
              components: getComponentWithVariants('Form/Select')([
                'MultiSelect/MultiSelect/MultiSelect',
              ]),
            },
            // {
            //   name: 'SingleSelect',
            //   components: getComponentWithVariants('Form/Select')([
            //     'SingleSelect/SingleSelect',
            //   ]),
            // },
          ],
          expand: true,
        },
        {
          name: 'Modules',
          content: './.styleguidist/modules.md',
          sections: [
            {
              name: 'Breadcrumb',
              components: getComponentWithVariants('Breadcrumb')([
                'Breadcrumb/Breadcrumb',
                'BreadcrumbLink/BreadcrumbLink',
              ]),
            },
            {
              name: 'Dropdown',
              components: getComponentWithVariants('Dropdown')([
                'Dropdown/Dropdown',
                'DropdownItem/DropdownItem',
              ]),
            },
            {
              name: 'LanguageMenu',
              components: getComponentWithVariants('LanguageMenu')([
                'LanguageMenu/LanguageMenu',
                'LanguageMenuItem/LanguageMenuItem',
                'LanguageMenuLink/LanguageMenuLink',
              ]),
            },
            {
              name: 'Expander',
              components: getComponentWithVariants('Expander')([
                'Expander/Expander',
                'ExpanderGroup/ExpanderGroup',
                'ExpanderTitle/ExpanderTitle',
                'ExpanderTitleButton/ExpanderTitleButton',
                'ExpanderContent/ExpanderContent',
              ]),
            },
            {
              name: 'Modal',
              components: getComponentWithVariants('Modal')([
                'Modal/Modal',
                'ModalContent/ModalContent',
                'ModalFooter/ModalFooter',
              ]),
            },
          ],
          expand: true,
        },
      ],
      sectionDepth: 2,
      expand: true,
    },
  ],
};
