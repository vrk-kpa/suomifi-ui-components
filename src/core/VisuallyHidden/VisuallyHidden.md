The **VisuallyHidden** component allows you to hide content from sight while keeping it available for screen readers.

```js
import { VisuallyHidden, SearchInput } from 'suomifi-ui-components';
<>
  <span>There is a hidden element under this text.</span>
  <VisuallyHidden>
    This element will be read by screen readers even though it's
    visually hidden
  </VisuallyHidden>

  <SearchInput
    labelText="This label is only for screen readers"
    labelMode="hidden"
    fullWidth
  />
</>;
```
