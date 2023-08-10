The `<Breadcrumb>` component is used to let the user know their current location in a web service.

Examples:

<ul>
  <li><a href="/#/Components/Breadcrumb?id=basic-use">Basic use</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/Breadcrumb?id=props--methods">Props & methods (Breadcrumb)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/Breadcrumb?id=breadcrumblink">Props & methods (BreadcrumbLink)</a>
</div>

### Basic use

Use an `aria-label` to describe the purpose of the Breadcrumb element.

Mark the current page with the `current` prop.

```jsx
import { Breadcrumb, BreadcrumbLink } from 'suomifi-ui-components';

<Breadcrumb aria-label="Your current location">
  <BreadcrumbLink href="/">Home</BreadcrumbLink>
  <BreadcrumbLink href="/citizens">Citizens</BreadcrumbLink>
  <BreadcrumbLink current>Social security</BreadcrumbLink>
</Breadcrumb>;
```

## Props & methods
