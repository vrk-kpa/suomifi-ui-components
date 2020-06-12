```js
import { Dropdown } from 'suomifi-ui-components';

<Dropdown visualPlaceholder="Dropdown" labelText="Dropdown label">
  <Dropdown.item onSelect={() => console.log('dropdown item 1')}>
    Dropdown Item 1
  </Dropdown.item>
  <Dropdown.item onSelect={() => console.log('dropdown item 2')}>
    Dropdown Item 2
  </Dropdown.item>
</Dropdown>;
```

```js
import { Dropdown } from 'suomifi-ui-components';

<Dropdown
  visualPlaceholder="Dropdown with visually hidden label"
  labelText="Dropdown label"
  labelMode="hidden"
>
  <Dropdown.item onSelect={() => console.log('dropdown item 1')}>
    Dropdown Item 1
  </Dropdown.item>
  <Dropdown.item onSelect={() => console.log('dropdown item 2')}>
    Dropdown Item 2
  </Dropdown.item>
</Dropdown>;
```

```js
import { Dropdown, Block } from 'suomifi-ui-components';

const dropdownProps = {
  'aria-labelledby': 'dropdown-group'
};

<div>
  <label id="dropdown-group">
    <p>Dropdown group</p>
  </label>
  <Block padding="xs">
    <Dropdown
      visualPlaceholder="Dropdown 1"
      labelText="Dropdown 1 label"
      {...dropdownProps}
    >
      <Dropdown.item
        onSelect={() => console.log('dropdown 1 item 1')}
      >
        Dropdown 1 Item 1
      </Dropdown.item>
      <Dropdown.item
        onSelect={() => console.log('dropdown 1 item 2')}
      >
        Dropdown 1 Item 2
      </Dropdown.item>
    </Dropdown>
  </Block>
  <Block padding="xs">
    <Dropdown
      visualPlaceholder="Dropdown 2"
      labelText="Dropdown 2 label"
      {...dropdownProps}
    >
      <Dropdown.item
        onSelect={() => console.log('dropdown 2 item 2')}
      >
        Dropdown 2 Item 1
      </Dropdown.item>
      <Dropdown.item
        onSelect={() => console.log('dropdown 2 item 2')}
      >
        Dropdown 2 Item 2
      </Dropdown.item>
    </Dropdown>
  </Block>
</div>;
```
