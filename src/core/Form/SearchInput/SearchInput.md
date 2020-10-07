```js
import { SearchInput } from 'suomifi-ui-components';
<>
  <SearchInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Search..."
    labelMode="hidden"
    visualPlaceholder="Search..."
  />

  <SearchInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Search the site"
    labelMode="visible"
    visualPlaceholder="Search..."
  />

  <SearchInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Search the site"
    labelMode="visible"
    defaultValue="Te"
    visualPlaceholder="Search..."
    status="error"
    statusText="At least 3 characters are required to search"
  />
</>;
```
