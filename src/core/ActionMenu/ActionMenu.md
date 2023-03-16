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
import React from 'react';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<>
  <button>dsd</button>
  <div style={{ marginLeft: '200px' }}>
    <ActionMenu buttonText="my menu">
      <ActionMenuItem asComponent={Link} href="www.suomi.fi">
        Go to link
      </ActionMenuItem>
      <ActionMenuItem onClick={() => console.log('Item 1')}>
        Do action 1
      </ActionMenuItem>
      <ActionMenuDivider />
      <ActionMenuItem
        asComponent={CustomButton}
        onClick={() => console.log('Pidempi')}
      >
        Pidempi nimi toiminnolle
      </ActionMenuItem>
      <ActionMenuItem
        asComponent={CustomButton}
        onClick={() => console.log('Muokkaa')}
      >
        Muokkaa
      </ActionMenuItem>
      <ActionMenuItem
        asComponent={CustomButton}
        onClick={() => console.log('Poista')}
        icon="Search"
      >
        Poista
      </ActionMenuItem>
      <ActionMenuItem
        asComponent={CustomButton}
        onClick={() => console.log('Disabled')}
        icon="Search"
        disabled
      >
        Disabled
      </ActionMenuItem>
    </ActionMenu>
  </div>
</>;
```
