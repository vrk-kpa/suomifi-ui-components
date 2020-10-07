```js
import { useState } from 'react';
import { SearchInput } from 'suomifi-ui-components';

const [value, setValue] = useState('test');

<>
  <SearchInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Search..."
    labelMode="hidden"
    visualPlaceholder="Search..."
  />

  <SearchInput
    onChange={(value) => console.log(value)}
    labelText="Search the site"
    labelMode="visible"
    visualPlaceholder="Search..."
  />

  <SearchInput
    onSearch={(value) => console.log(value)}
    onChange={(value) => setValue(value)}
    value={value}
    labelText="Search the site"
    labelMode="visible"
    defaultValue="Te"
    visualPlaceholder="Search..."
    status="error"
    statusText="At least 3 characters are required to search"
  />
</>;
```
