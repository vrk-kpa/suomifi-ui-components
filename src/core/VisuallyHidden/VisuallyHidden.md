The **VisuallyHidden** component allows you to hide content from sight while keeping it in the DOM for screen reader users.

```js
import { VisuallyHidden, TextInput } from 'suomifi-ui-components';
<>
  <span>There is a hidden element under this text.</span>
  <VisuallyHidden>
    This element will be in the DOM even though it's hidden
  </VisuallyHidden>
</>;
```
