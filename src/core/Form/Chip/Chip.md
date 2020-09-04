```js
import { Chip } from 'suomifi-ui-components';
<>
  <Chip removable removableLabel="Poista valinta">
    Testichippi
  </Chip>
  <Chip
    onClick={() => {
      alert('Booyarh!');
    }}
  >
    <div>Testi2</div>
  </Chip>
</>;
```
