```js
import { useState } from 'react';
import { SearchInput } from 'suomifi-ui-components';

const [value, setValue] = useState('About');

const sharedProps = {
  labelText: 'Search the site',
  searchButtonLabel: 'Search',
  clearButtonLabel: 'Clear',
  visualPlaceholder: 'Search...'
};

<>
  <SearchInput
    {...sharedProps}
    fullWidth
    onSearch={(value) => console.log(value)}
    defaultValue="About"
  />

  <SearchInput
    {...sharedProps}
    inputContainerProps={{ style: { width: '250px' } }}
    onChange={(value) => console.log(value)}
    labelMode="hidden"
  />

  <SearchInput
    {...sharedProps}
    onChange={(value) => setValue(value)}
    value={value}
    status="error"
    statusText="At least 3 characters are required to search"
  />

  <form action="https://www.suomi.fi/haku?">
    <SearchInput
      {...sharedProps}
      labelText="Search Suomi.fi site"
      name="q"
      searchButtonProps={{ type: 'submit' }}
    />
  </form>
</>;
```
