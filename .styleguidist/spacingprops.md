## Using margin properties

Most components accept margin properties to define space around the outermost element of the component. If component supports margin properties, it is mentioned in the component page next to component's prop description.

### Usage example

For example Button component can be styled with margin properties.

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button margin="s">Proceed</Button>
</>;
```

### Overriding with style attribute

Margin properties add inline styling to the rendered HTML. If the component interface also accepts a style attribute, it takes precedence over margin property.

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button margin="s" style={{ marginLeft: 100 }}>
    Proceed
  </Button>
</>;
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
