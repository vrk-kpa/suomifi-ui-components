The `<VisuallyHidden>` component allows you to hide content from sight while keeping it available for screen readers.

It is mostly used for additional information for screen reader users. It is utilized internally by the library in multiple places, for example to help screen reader users keep track of a character counter.

This component should only be used to provide screen reader users supplemental information where a visual representation of that information would cause issues.

- [Basic use](./#/Components/VisuallyHidden?id=basic-use)
- [In library components](./#/Components/VisuallyHidden?id=in-library-components)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/VisuallyHidden?id=props--methods)
</div>

### Basic use

```js
import { VisuallyHidden } from 'suomifi-ui-components';
<>
  <div>
    This example contains a visible and a visually hidden text
    element.
  </div>
  <VisuallyHidden>
    This text is hidden but can be found by screen readers
  </VisuallyHidden>
</>;
```

### In library components

The library components utilize the `<VisuallyHidden>` element in various ways. See [Textarea](./#/Components/Textarea?id=textarea-with-character-counter) for an example use case.

There are also a few exceptions where the component library provides the possibility to, for example, hide a label.

```js
import { SearchInput } from 'suomifi-ui-components';
<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  labelMode="hidden"
/>;
```

### Props & methods
