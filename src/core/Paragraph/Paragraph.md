`<Paragraph>` is a HTML `<p>` element that contains the correct Suomi.fi styles by default.

The [Text](/#/Components/Text) component can be used inside the Paragraph for more styling options.

Examples:

- [Basic use](/#/Components/Paragraph?id=basic-use)
- [Bottom margin](/#/Components/Paragraph?id=bottom-margin)

<div style="margin-bottom: 40px">
  [Props & methods](#/Components/Paragraph?id=props--methods)
</div>

### Basic use

```js
import { Paragraph } from 'suomifi-ui-components';

<>
  <Paragraph>
    The paragraph component can and should be utilized for easy
    semantics and robust Suomi.fi styling.
  </Paragraph>
</>;
```

### Bottom margin

For easy styling of a view, the paragraph has a `marginBottomSpacing` prop that allows easy use of Suomi.fi spacing tokens as bottom margin values.

```js
import { Paragraph } from 'suomifi-ui-components';

<div>
  <Paragraph marginBottomSpacing="s">
    The paragraph component can and should be utilized for easy
    semantics and robust Suomi.fi styling.
  </Paragraph>
  <Paragraph marginBottomSpacing="s">
    Setting a bottom spacing for the paragraph component allows easy
    visual structuring of text content.
  </Paragraph>
</div>;
```

### Props & methods
