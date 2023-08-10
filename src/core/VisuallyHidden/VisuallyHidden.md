The `<VisuallyHidden>` component allows you to hide content from sight while keeping it available for screen readers.

It is mostly used for additional information for screen reader users. It is utilized internally by the library in multiple places, for example to help screen reader users keep track of a character counter.

It should only be used to provide screen reader users supplemental information where a visual representation of that information would cause issues.

<ul>
<li>[Basic use](/#/Components/VisuallyHidden?id=basic-use)</li>
<li>[In library components](/#/Components/VisuallyHidden?id=in-library-components)</li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/VisuallyHidden?id=props--methods">Props & methods (VisuallyHidden)</a>
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

The library components utilize the `<VisuallyHidden>` element in various ways. See [Textarea](/#/Components/Textarea?id=textarea-with-character-counter) for an example use case.

There are also a few exceptions where the component library provides the possibility to, for example, hide a label.

```js
import { SearchInput } from 'suomifi-ui-components';
<SearchInput
  labelText="Search the site"
  labelMode="hidden"
  fullWidth
/>;
```

### Props & methods
