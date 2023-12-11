`<Button>` initiates an action. An action can be, for example, proceeding to the next step of a process or submitting a form.

You should not, however, use a `<Button>` in place of a link. If your action changes the URL, is bookmarkable or should be available to open in a new tab, use the `<Link>` component instead.

Examples:

- [Basic use](./#/Components/Button?id=basic-use)
- [Full width button](./#/Components/Button?id=full-width-button)
- [Disabled button](./#/Components/Button?id=disabled-button)
- [Icons in button](./#/Components/Button?id=icons-in-button)
- [Secondary button](./#/Components/Button?id=secondary-button)
- [Light secondary button](./#/Components/Button?id=light-secondary-button)
- [Inverted button](./#/Components/Button?id=inverted-button)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Button?id=props--methods)
</div>

### Basic use

```js
import { Button } from 'suomifi-ui-components';

<Button onClick={() => console.log('Submitting form...')}>
  Submit
</Button>;
```

### Full width button

Use `fullwidth` Button on smaller screen sizes.

```js
import { Button } from 'suomifi-ui-components';

<Button onClick={() => console.log('Submitting form...')} fullWidth>
  Submit
</Button>;
```

### Disabled button

In the example below

- The first Button is fully `disabled`
- The second one is `aria-disabled`. Aria-disabled allows focus but disables the button's `onClick()` functionality.

It is good practice to provide additional information as to why a Button is disabled.

```js
import { Button, Paragraph, Text } from 'suomifi-ui-components';

<>
  <Button
    disabled
    aria-describedby="additional-info"
    onClick={() => console.log('Test button1 click')}
  >
    Submit
  </Button>
  <Button
    aria-describedby="additional-info"
    aria-disabled={true}
    onClick={() => console.log('Test button2 click')}
  >
    Submit
  </Button>
  <Paragraph id="additional-info">
    <Text>You must fill all required fields before submitting</Text>
  </Paragraph>
</>;
```

### Icons in button

When using a Button whose only visible content is an icon, provide a descriptive `aria-label` for .

```js
import { Button, IconArrowRight } from 'suomifi-ui-components';

<>
  <Button icon={<IconArrowRight />} aria-label="Proceed"></Button>

  <Button icon={<IconArrowRight />}>Proceed</Button>

  <Button iconRight={<IconArrowRight />}>Proceed</Button>
</>;
```

### Secondary button

A secondary Button is used for an optional action. A borderless variant can be used to further diminsh the Button's notability.

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button variant="secondary">Go back</Button>

  <Button variant="secondaryNoBorder">Go back</Button>
</>;
```

### Light secondary button

A light secondary Button is used for a noteworthy but not necessarily required action. Example use case: a table where the Button is repeated on every row.

```js
import { Button } from 'suomifi-ui-components';

<Button variant="secondaryLight">Edit row</Button>;
```

### Inverted button

An inverted Button is used on colored backgrounds.

```js
import {
  Button,
  Block,
  suomifiDesignTokens
} from 'suomifi-ui-components';

<Block
  style={{ background: suomifiDesignTokens.colors.highlightBase }}
  py="xl"
  px="xxxl"
>
  <Button variant="inverted">Open</Button>
</Block>;
```

### Props & methods

Button component supports [margin props](./#/Spacing/Margin%20props) for spacing.
