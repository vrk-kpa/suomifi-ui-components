```js
import { SearchInput } from 'suomifi-ui-components';
<>
  <SearchInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Search..."
    labelMode="hidden"
  />

  <SearchInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Search..."
    labelMode="visible"
    placeholder="Any value (see console)"
  />
</>;
```
