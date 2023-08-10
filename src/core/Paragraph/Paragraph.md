Paragraph is a html paragraph element that contains the correct Suomi.fi styles by default.

The [Text](/#/Components/Text) component can be used inside the paragraph for more styling options.

Examples:

- [Basic use](/#/Components/Paragraph?id=basic-use)
- [Paragraph with bottom margin](/#/Components/Paragraph?id=Paragraph-with-bottom-margin)

<div style="margin-bottom: 40px">
  <a href="/#/Components/Paragraph?id=props--methods">Props & methods</a>
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

### Paragraph with bottom margin

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
