const path = require('path');
const versions = require('../styleguide.versions');

const singularComponents = [
  'Block',
  'Button',
  'Heading',
  'Tooltip',
  'VisuallyHidden',
  'Pagination',
  'Alert',
  'InlineAlert',
  'LoadingSpinner',
  'Text',
  'Paragraph',
  'Notification',
  'Toast',
  'Details',
  ['Form', 'TextInput'],
  ['Form', 'TimeInput'],
  ['Form', 'SearchInput'],
  ['Form', 'Textarea'],
  ['Form', 'DateInput'],
  ['Form', 'Label'],
  ['Form', 'HintText'],
  ['Form', 'StatusText'],
  ['Form/Select/MultiSelect/', 'MultiSelect'],
  ['Form/Select', 'SingleSelect'],
  ['Form', 'ErrorSummary'],
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
const getComponentWithVariants = (component) => (variants) => [
  getComponent({ name: component }),
  ...variants.map((variant) =>
    getComponent({ underName: component, name: variant }),
  ),
];

const getVersions = () => {
  const href = process.env.BASE_PATH || './';
  const basePath = process.env.BASE_PATH || '';
  return [
    {
      name: 'Latest',
      href,
    },
    ...versions.map((version) => ({
      ...version,
      href: basePath + version.href,
    })),
  ];
};

module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: './.styleguidist/introduction.md',
      sections: [() => {}],
      sectiondepth: 0,
    },
    {
      name: 'Accessibility',
      content: './.styleguidist/accessibility.md',
      sections: [() => {}],
      sectiondepth: 0,
    },
    {
      name: 'Foundations',
      content: './.styleguidist/foundations.md',
      sections: [
        {
          name: 'Colors',
          content: './.styleguidist/colors.md',
        },
        {
          name: 'Icons',
          content: './.styleguidist/icons.md',
        },
        {
          name: 'Typography',
          content: './.styleguidist/typography.md',
        },
        {
          name: 'Spacing',
          content: './.styleguidist/spacing.md',
          sections: [
            {
              name: 'Margin props',
              content: './.styleguidist/spacingprops.md',
            },
            {
              name: 'Tokens',
              content: './.styleguidist/spacingtokens.md',
            },
          ],
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
      name: 'Versions',
      content: './.styleguidist/versions.md',
      sections: getVersions(),
      sectiondepth: 1,
      expand: false,
    },
    {
      name: 'Components',
      content: './.styleguidist/components.md',
      components: getComponents(singularComponents),
      sections: [
        {
          name: 'Toggle',
          components: getComponentWithVariants('Form/Toggle')([
            'ToggleButton/ToggleButton',
            'ToggleInput/ToggleInput',
          ]),
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
          name: 'LinkList',
          components: getComponentWithVariants('Link')([
            'LinkList/LinkList',
            'LinkListItem/LinkListItem',
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
          content: './.styleguidist/icon.md',
        },
        /*{
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
        }, */
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
            'ExpanderTitleButton/ExpanderTitleButton',
            'ExpanderContent/ExpanderContent',
            'ExpanderGroup/ExpanderGroup',
            'ExpanderTitle/ExpanderTitle',
          ]),
        },
        {
          name: 'Modal',
          components: getComponentWithVariants('Modal')([
            'Modal/Modal',
            'ModalContent/ModalContent',
            'ModalTitle/ModalTitle',
            'ModalFooter/ModalFooter',
          ]),
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
        {
          name: 'ActionMenu',
          components: getComponentWithVariants('ActionMenu')([
            'ActionMenu/ActionMenu',
            'ActionMenuItem/ActionMenuItem',
            'ActionMenuDivider/ActionMenuDivider',
          ]),
        },
      ],
      sectionDepth: 1,
      expand: true,
    },
  ],
};
