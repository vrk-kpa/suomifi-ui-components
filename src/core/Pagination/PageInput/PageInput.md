```js
import { useState } from 'react';
import { SearchInput } from 'suomifi-ui-components';

const [value, setValue] = useState('About');

const sharedProps = {
  labelText: '',
  searchButtonLabel: 'Search',
  clearButtonLabel: 'Clear',
  visualPlaceholder: 'Write page number here...'
};

<>
  <PageInput
    {...sharedProps}
    fullWidth
    onSearch={(value) => console.log(value)}
    defaultValue="About"
    onChange={(value) => console.log(value)}
    debounce={500}
  />

  <PageInput
    {...sharedProps}
    wrapperProps={{ style: { width: '250px' } }}
    labelMode="hidden"
  />

  <PageInput
    {...sharedProps}
    onChange={(value) => setValue(value)}
    value={value}
    status="error"
    statusText="At least 3 characters are required to search"
  />

  <form action="https://www.suomi.fi/haku?">
    <PageInput
      {...sharedProps}
      labelText="Search Suomi.fi site"
      name="q"
      searchButtonProps={{ type: 'submit' }}
    />
  </form>
</>;
```
