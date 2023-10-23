Most components accept margin properties to define space around the outermost element of the component. If a component supports margin properties, it is mentioned on the component's documentation page next to its prop descriptions.

### Usage example

For example Button component can be styled with margin properties.

```jsx
import { Button } from 'suomifi-ui-components';

<div style={{ border: '1px dashed black' }}>
  <Button margin="xl">Proceed</Button>
</div>;
```

### Overriding with style attribute

Margin properties add inline styling to the rendered HTML. If the component interface also accepts a style attribute, it takes precedence over margin property.

```jsx
import { Button } from 'suomifi-ui-components';

<div style={{ border: '1px dashed black' }}>
  <Button margin="s" style={{ marginLeft: '100px' }}>
    Proceed
  </Button>
</div>;
```

### Available properties

| Prop name | Type                    | Description               |
| --------- | ----------------------- | ------------------------- |
| margin    | SpacingWithoutInsetProp | margin                    |
| mx        | SpacingWithoutInsetProp | margin-right, margin-left |
| my        | SpacingWithoutInsetProp | margin-top, margin-bottom |
| mt        | SpacingWithoutInsetProp | margin-top                |
| mr        | SpacingWithoutInsetProp | margin-right              |
| mb        | SpacingWithoutInsetProp | margin-bottom             |
| ml        | SpacingWithoutInsetProp | margin-left               |

### Full list of compliant components

The following components support margin props

- ActionMenu
- Alert
- Breadcrumb
- Button
- Checkbox
- CheckboxGroup
- Chip
- DateInput
- Dropdown
- Expander
- ExpanderGroup
- ExternalLink
- Heading
- HintText
- InlineAlert
- Label
- LanguageMenu
- Link
- LinkList
- LoadingSpinner
- MultiSelect
- Notification
- Pagination
- RadioButton
- RadioButtonGroup
- RouterLink
- SearchInput
- ServiceNavigation
- SideNavigation
- SingleSelect
- StaticChip
- StatusText
- Text
- Textarea
- TextInput
- TimeInput
- Toast
- ToggleButton
- ToggleInput
- Tooltip
- WizardNavigation
