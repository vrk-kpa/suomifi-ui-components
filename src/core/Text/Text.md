`<Text>` is a generic inline element that ensures the correct font and text styles are used. The different variants of text content are easily accessed via the properties of the component. Use together with [Paragraph](./#/Components/Paragraph) to easily build text content views.

- The default variant, `body`, is suitable for general text content on all screen sizes
- Bold text can be used to highlight parts of the text, but should be used sparingly
- Lead text style is used only once at the start of a page to provide an overview of the content.

Examples:

- [Basic use](./#/Components/Text?id=basic-use)
- [Small variant](./#/Components/Text?id=small-variant)
- [Setting text color](./#/Components/Text?id=setting-text-color)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Text?id=props--methods)
</div>

### Basic use

```js
import { Text } from 'suomifi-ui-components';

<>
  <Text>Default body text</Text>
  <div />
  <Text variant="lead">Lead text</Text>
  <div />
  <Text variant="bold">Bold text</Text>
</>;
```

### Small variant

For special cases the smaller font size variant can be used. Default size should be used for main content on all screen sizes.

```js
import { Text } from 'suomifi-ui-components';
<>
  <Text smallScreen>Smaller text for special use cases</Text>
  <div />
  <Text>Default text size for comparison</Text>
</>;
```

### Setting text color

Text color can be easily set via the `color` property, which accepts Suomi.fi color token names as values.

```js
import { Text } from 'suomifi-ui-components';

<Text color="accentBase">Colored text</Text>;
```

### Props & methods
