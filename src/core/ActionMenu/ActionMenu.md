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
      id="my-id"
      openButtonLabel="Open menu"
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
        icon="remove"
      >
        Remove
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Disabled')}
        icon="reply"
        disabled
      >
        Disabled
      </ActionMenuItem>
      <ActionMenuItem href="#" icon="chat" disabled>
        Disabled link
      </ActionMenuItem>
    </ActionMenu>
  </div>
  <div>Last action: {lastAction}</div>
</>;
```

### ActionMenu with icon only

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
      disabled={false}
      id="icon-only-id"
      openButtonLabel="Actions"
    >
      <ActionMenuItem onClick={() => setLastAction('Copy')}>
        Copy
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Edit')}
        icon="edit"
      >
        Edit
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Remove')}
        icon="remove"
      >
        Remove
      </ActionMenuItem>
    </ActionMenu>
  </div>
  <div>Last action: {lastAction}</div>
</>;
```

### Full width

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
      disabled={false}
      id="full-id"
      openButtonLabel="Actions"
      fullWidth
    >
      <ActionMenuItem onClick={() => setLastAction('Copy')}>
        Copy
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Edit')}
        icon="edit"
      >
        Edit
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Remove')}
        icon="remove"
      >
        Remove
      </ActionMenuItem>
    </ActionMenu>
  </div>
  <div>Last action: {lastAction}</div>
</>;
```
