const path = require('path');
const glob = require('glob');

const primitiveComponents = [
  'Block',
  'Button',
  'Heading',
  'Tooltip',
  'VisuallyHidden',
  'Pagination',
  ['Form', 'TextInput'],
  ['Form', 'SearchInput'],
  ['Form', 'Textarea'],
  ['Form', 'DateInput'],
  ['Form', 'Label'],
  ['Form', 'HintText'],
  ['Form', 'StatusText'],
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
        {
          name: 'Logger',
          content: './.styleguidist/logger.md',
        },
      ],
      sectionDepth: 2,
      expand: true,
    },
    {
      name: 'Components',
      content: './.styleguidist/components.md',
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
          name: 'Alert',
          components: getComponentWithVariants('Alert')([
            'Alert/Alert',
            'InlineAlert/InlineAlert',
          ]),
        },
        {
          name: 'LoadingSpinner',
          components: getComponents(['LoadingSpinner']),
        },
        {
          name: 'Checkbox',
          components: getComponentWithVariants('Form/Checkbox')([
            'Checkbox',
            'CheckboxGroup',
          ]),
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
            'RouterLink/RouterLink',
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
          components: getComponents(['Icon', 'StaticIcon', 'LogoIcon']),
        },
        {
          name: 'MultiSelect',
          components: getComponentWithVariants('Form/Select')([
            'MultiSelect/MultiSelect/MultiSelect',
          ]),
        },
        {
          name: 'SingleSelect',
          components: getComponentWithVariants('Form/Select')([
            'SingleSelect/SingleSelect',
          ]),
        },
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
          name: 'Notification',
          components: getComponents(['Notification']),
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
        {
          name: 'Toast',
          components: getComponents(['Toast']),
        },
        {
          name: 'WizardNavigation',
          components: getComponentWithVariants('Navigation/WizardNavigation')([
            'WizardNavigation/WizardNavigation',
            'WizardNavigationItem/WizardNavigationItem',
          ]),
        },
        {
          name: 'ServiceNavigation',
          components: getComponentWithVariants('Navigation/ServiceNavigation')([
            'ServiceNavigation/ServiceNavigation',
            'ServiceNavigationItem/ServiceNavigationItem',
          ]),
        },
        {
          name: 'SideNavigation',
          components: getComponentWithVariants('Navigation/SideNavigation')([
            'SideNavigation/SideNavigation',
            'SideNavigationItem/SideNavigationItem',
          ]),
        },
      ],
      sectionDepth: 1,
      expand: true,
    },
  ],
};
