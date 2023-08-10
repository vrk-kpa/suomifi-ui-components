Toast is a visual element that appears after a user action to notify the user of the success or failure of the action. For example "Information saved successfully".

This component provides only the visual element of the toast. Animation and usage logic will need to be built separately. Toast should be anchored at the top of the page and stay visible for 10 seconds or as long as the cursor hovers over the toast.

The content is conveyed to screen reader users by default via `aria-live="polite"`

Examples:

<ul>
<li>[Basic use](/#/Components/Toast?id=basic-use)</li>
<li>[Toast with heading](/#/Components/Toast?id=toast-with-heading)</li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/Toast?id=props--methods">Props & methods</a>
</div>

### Basic use

```js
import { Toast } from 'suomifi-ui-components';

<Toast>Information saved successfully</Toast>;
```

### Toast with heading

Toast can also contain a heading if needed. The content should, however, be kept concise in all cases.

```js
import { Toast } from 'suomifi-ui-components';

<Toast headingVariant="h2" headingText="Success">
  Your information was sent successfully.
</Toast>;
```

### Props & methods
