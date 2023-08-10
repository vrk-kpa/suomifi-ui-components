`<Label>` is an accessible label component to use with custom input elements.

Under the hood, the `suomifi-ui-components` library uses this component extensively in form components.

Examples:

<ul>
  <li><a href="/#/Components/Label?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/Label?id=marking-an-input-optional">Marking an input optional</a></li>
  <li><a href="/#/Components/Label?id=tooltip">Tooltip</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/Label?id=props--methods">Props & methods</a>
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

By default, all Suomi.fi form inputs are considered required. If the input is not required, you can set `optionalText` after the Label to mark it as such.

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

Do not use Tooltip for any crucial information regarding the input. Crucial information should be conveyed through the <a href="/#/Components/HintText">HintText</a> component instead. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the <a href="/#/Components/Tooltip">Tooltip documentation.</a>

```js
import { Label, Tooltip, Text } from 'suomifi-ui-components';

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
