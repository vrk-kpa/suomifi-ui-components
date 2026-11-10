`<Toast>` is a visual element that appears after an action to notify the user that the action was successful.

This component provides only the visual element of the toast. Animation and usage logic will need to be built separately. Toast should be anchored at the top right corner of the page and stay visible for at least 10 seconds if it is not manually dismissed by the user.

If you need to show a dynamically appearing alert which is more persistent, use the [InlineAlert](./#/Components/InlineAlert) component instead.

Examples:

- [Basic use](./#/Components/Toast?id=basic-use)
- [Toast with heading](./#/Components/Toast?id=toast-with-heading)
- [Toast with close button](./#/Components/Toast?id=toast-with-close-button)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Toast?id=props--methods)
</div>

### Basic use

<div style="border: 1px solid #c8cdd0; padding: 20px 20px 4px 20px; background: #eaf2fa; margin-bottom: 30px;">
#### Important!

To ensure accessibility, always wrap a dynamically appearing Toast in an aria-live region as shown in the examples below. The element which has an aria-live attribute must be present in the HTML document before the Toast component is rendered for assistive technology to notice the dynamically appearing content.

</div>

```js
import { Toast, Block } from 'suomifi-ui-components';

<Block aria-live="polite" style={{ width: '100%' }}>
  <Toast>Information saved successfully</Toast>
</Block>;
```

### Toast with heading

Toast can also contain a `headingText` if needed. You can control the semantics of the heading with the `headingVariant` prop (visual style is fixed).

Even with a heading the content should be kept concise.

```js
import { Toast, Block } from 'suomifi-ui-components';
<Block aria-live="polite" style={{ width: '100%' }}>
  <Toast headingVariant="h2" headingText="Success">
    Your information was sent successfully.
  </Toast>
</Block>;
```

### Toast with close button

In some cases you might want to give the user the option to close the toast manually. This can be achieved by giving the toast the `showCloseButton` and `closeText` attributes.

```js
import { Toast, Button, Block } from 'suomifi-ui-components';
import { useState } from 'react';

const [showToast, setShowToast] = useState(false);

<>
  <Block aria-live="polite" style={{ width: '100%' }}>
    {showToast && (
      <Toast
        showCloseButton
        closeText="Close"
        onCloseButtonClick={() => setShowToast(false)}
      >
        Your information was sent successfully.
      </Toast>
    )}
  </Block>
  <Button onClick={() => setShowToast(true)}>Show toast</Button>
</>;
```

### useToast hook

Use the `useToast` hook to handle the lifecycle of the toast element. It takes care of the timing, focus and some accessibility features of the toast. Animation and position needs to be configured separately. See [the pattern example](https://designsystem.suomi.fi/patterns/toast) for reference.

```js
import {
  Toast,
  Button,
  Block,
  useToast
} from 'suomifi-ui-components';
import { useState, useRef } from 'react';

const triggerRef = useRef();
const toast = useToast({ returnFocusRef: triggerRef });

<>
  <Block aria-live="polite" style={{ width: '100%' }}>
    {toast.isVisible && (
      <Toast
        {...toast.toastProps}
        showCloseButton
        closeText="close notification"
        onCloseButtonClick={toast.close}
      >
        Your information was sent successfully
      </Toast>
    )}
  </Block>
  <Button ref={triggerRef} onClick={toast.open}>
    Show toast
  </Button>
</>;
```

### Props & methods

Toast component supports [margin props](./#/Spacing/Margin%20props) for spacing.

```

```
