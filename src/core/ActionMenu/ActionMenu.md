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

const exampleRef = React.createRef();

<>
  <button onClick={() => exampleRef.current.focus()}>
    focus ref
  </button>
  <button
    onClick={() => console.log(exampleRef.current)}
    onMouseOver={() => console.log(exampleRef.current)}
  >
    print ref
  </button>
  <div style={{ marginLeft: '200px' }}>
    <ActionMenu
      buttonText="Actions"
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
      disabled={false}
      ref={exampleRef}
    >
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
      <ActionMenuItem asComponent={Link} href="www.suomi.fi">
        This is a link
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
