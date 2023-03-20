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

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

const [lastAction, setLastAction] = useState('');

<>
  <button>dsd</button>
  <div style={{ marginLeft: '200px' }}>
    <ActionMenu
      buttonText="Actions"
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
      disabled={false}
    >
      <ActionMenuItem asComponent={Link} href="www.suomi.fi">
        Super action
      </ActionMenuItem>
      <ActionMenuItem onClick={() => setLastAction('Action 1')}>
        Do action 1
      </ActionMenuItem>
      <ActionMenuDivider />
      <ActionMenuItem
        asComponent={CustomButton}
        onClick={() => setLastAction('Pidempi')}
      >
        Pidempi nimi toiminnolle
      </ActionMenuItem>
      <ActionMenuItem
        asComponent={CustomButton}
        onClick={() => setLastAction('Muokkaa')}
      >
        Muokkaa
      </ActionMenuItem>
      <ActionMenuItem
        asComponent={CustomButton}
        onClick={() => setLastAction('Poista')}
        icon="Search"
      >
        Poista
      </ActionMenuItem>
      <ActionMenuItem
        asComponent={CustomButton}
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
