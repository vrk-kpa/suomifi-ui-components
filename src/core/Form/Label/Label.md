`<Label>` is an accessible label component to use with custom input elements.

Under the hood, the `suomifi-ui-components` library uses this component extensively in form components.

Examples:

- [Basic use](./#/Components/Label?id=basic-use)
- [Marking an input optional](./#/Components/Label?id=marking-an-input-optional)
- [Tooltip](./#/Components/Label?id=tooltip)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Label?id=props--methods)
</div>

### Basic use

```js
import { Label } from 'suomifi-ui-components';

<div>
  <Label htmlFor="custom-input">Name</Label>
  <input id="custom-input" type="text" />
</div>;
```

### Marking an input optional

Suomi.fi inputs are required by default, but can be marked optional using the Label's `optionalText` property.

```js
import { Label } from 'suomifi-ui-components';

<div>
  <Label htmlFor="custom-input" optionalText="optional">
    Name
  </Label>
  <input id="custom-input" type="text" />
</div>;
```

### Tooltip

A `<Tooltip>` component can be used with Label to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for [HintText](./#/Components/HintText). Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import { Label, Tooltip, Heading, Text } from 'suomifi-ui-components';

const labelText = 'Identifier';

<div>
  <Label
    htmlFor="custom-input-with-tooltip"
    optionalText="optional"
    tooltipComponent={
      <Tooltip
        ariaToggleButtonLabelText={`${labelText}, additional information`}
        ariaCloseButtonLabelText={`${labelText}, close additional information`}
      >
        <Heading variant="h5" as="h2">
          What are the benefits for providing an identifier?
        </Heading>
        <Text>
          Adding an identifier to your item to makes it easier to find
          with the search functionality
        </Text>
      </Tooltip>
    }
  >
    {labelText}
  </Label>
  <input id="custom-input-with-tooltip" type="text" />
</div>;
```

### Props & methods
