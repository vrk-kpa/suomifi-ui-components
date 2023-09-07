`<Toast>` is a visual element that appears after an action to notify the user that the action was successful.

This component provides only the visual element of the toast. Animation and usage logic will need to be built separately. Toast should be anchored at the top of the page and stay visible for 10 seconds or as long as the cursor hovers over the toast.

The content is conveyed to screen reader users by default via an underlying `aria-live="polite"` element.

Examples:

- [Basic use](./#/Components/Toast?id=basic-use)
- [Toast with heading](./#/Components/Toast?id=toast-with-heading)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Toast?id=props--methods)
</div>

### Basic use

```js
import { Toast } from 'suomifi-ui-components';

<Toast>Information saved successfully</Toast>;
```

### Toast with heading

Toast can also contain a `headingText` if needed. You can control the semantics of the heading with the `headingVariant` prop (visual style is fixed).

Even with a heading the content should be kept concise.

```js
import { Toast } from 'suomifi-ui-components';

<Toast headingVariant="h2" headingText="Success">
  Your information was sent successfully.
</Toast>;
```

### Props & methods
