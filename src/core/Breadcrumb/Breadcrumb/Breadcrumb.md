The `<Breadcrumb>` component is used to let the user know their current location in a web service. It is rendered as an HTML `nav` element.

Examples:

- [Basic use](./#/Components/Breadcrumb?id=basic-use)

<div style="margin-bottom: 5px">
 [Props & methods (Breadcrumb)](./#/Components/Breadcrumb?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (BreadcrumbLink)](./#/Components/Breadcrumb?id=breadcrumblink)
</div>

### Accessibility Notes

- Height does not adjust when text wraps, e.g. when text is resized 200%.

### Basic use

Use an `aria-label` to describe the purpose of the Breadcrumb element and distinguish it from other navigation landmarks on the same page.

Mark the current page with the `current` prop.

```jsx
import { Breadcrumb, BreadcrumbLink } from 'suomifi-ui-components';

<Breadcrumb aria-label="Your current location">
  <BreadcrumbLink href="/">Home</BreadcrumbLink>
  <BreadcrumbLink href="/citizens">Citizens</BreadcrumbLink>
  <BreadcrumbLink current>Social security</BreadcrumbLink>
</Breadcrumb>;
```

### Props & methods

Breadcrumb component supports [margin props](./#/Spacing/Margin%20props) for spacing.
