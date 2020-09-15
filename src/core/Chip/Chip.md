```js
import { Chip } from 'suomifi-ui-components';

const removeAction = () => {
  alert('Selection removed');
};

<>
  <div styles={{ display: 'inline' }}>
    <Chip removable actionLabel="Unselect" onClick={removeAction}>
      Removable chip 1
    </Chip>

    <Chip removable actionLabel="Unselect" onClick={removeAction}>
      Removable chip 2
    </Chip>
  </div>
  <div>
    <Chip onClick={removeAction}>
      Clickable chip without remove icon
    </Chip>
  </div>

  <Chip.static>
    Static chip with a long content that exceeds the size limit
  </Chip.static>

  <Chip.static disabled>Disabled static chip</Chip.static>
</>;
```
