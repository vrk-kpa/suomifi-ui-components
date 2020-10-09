```js
import { useState } from 'react';
import { SearchInput } from 'suomifi-ui-components';

const [value, setValue] = useState('test');

<>
  <SearchInput
    fullWidth
    onChange={(value) => console.log(value)}
    labelText="Search..."
    labelMode="hidden"
    visualPlaceholder="Search..."
  />

  <SearchInput
    inputContainerProps={{ style: { width: '400px' } }}
    onSearch={(value) => console.log(value)}
    labelText="Search the site"
    labelMode="visible"
    visualPlaceholder="Search..."
  />

  <SearchInput
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
