### Default ActionMenu

```js
import {
  ActionMenu,
  RouterLink,
  ActionMenuDivider,
  ActionMenuItem,
  Button,
  Link
} from 'suomifi-ui-components';
import { useState } from 'react';

const [lastAction, setLastAction] = useState('');

<>
  <div style={{ marginLeft: '200px' }}>
    <ActionMenu
      buttonText="Actions"
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
      disabled={false}
    >
      <ActionMenuItem onClick={() => setLastAction('Copy')}>
        Copy
      </ActionMenuItem>
      <ActionMenuDivider />
      <ActionMenuItem onClick={() => setLastAction('Long')}>
        Longer name for an action
      </ActionMenuItem>
      <ActionMenuItem onClick={() => setLastAction('Edit')}>
        Edit
      </ActionMenuItem>
      <ActionMenuItem href="https://www.suomi.fi">
        This is a link
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Remove')}
        icon="Search"
      >
        Remove
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Disabled')}
        icon="Search"
        disabled
      >
        Disabled
      </ActionMenuItem>
    </ActionMenu>
  </div>
  <div>Last action: {lastAction}</div>
</>;
```
