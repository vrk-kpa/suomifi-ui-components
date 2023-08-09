Breadcrumb component is used to let the user know their current location in the service. Use an aria-label which describes this function.

```jsx
import { Breadcrumb, BreadcrumbLink } from 'suomifi-ui-components';

<Breadcrumb aria-label="Your current location">
  <BreadcrumbLink href="/">Frontpage</BreadcrumbLink>
  <BreadcrumbLink href="/sub">Sub page</BreadcrumbLink>
  <BreadcrumbLink current>Sub sub page</BreadcrumbLink>
</Breadcrumb>;
```
