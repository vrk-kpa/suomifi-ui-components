The `<Chip>` component is used when you want to present concise information in a clear visually prominent way, for example to display the selected values of a listbox. In its most typical usecase, the Chip is a button with a "remove" icon.

Examples:

<ul>
  <li><a href="/#/Components/Chip?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/Chip?id=without-remove-icon">Without remove icon</a></li>
  <li><a href="/#/Components/Chip?id=disabled">Disabled</a></li>
  <li><a href="/#/Components/Chip?id=static-chip">Static chip</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/Chip?id=props--methods">Props & methods (Chip)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/Chip?id=staticchip">Props & methods (StaticChip)</a>
</div>

### Basic use

It is important to set the `actionLabel` text so that assistive technologies can describe the function of the Chip.

```js
import { Chip } from 'suomifi-ui-components';

<Chip
  removable
  actionLabel="Deselect item"
  onClick={() => console.log('Deselected: Finland')}
>
  Finland
</Chip>;
```

### Without remove icon

The remove icon can be hidden to allow for more use cases

```js
import { Chip } from 'suomifi-ui-components';

<Chip
  actionLabel="Log item to console"
  onClick={() => console.log('Clicked option: Finland')}
>
  Finland
</Chip>;
```

### Disabled

In the example below

- The first Chip is fully `disabled`
- The second one is `aria-disabled`. Aria-disabled allows focus but disables the Chip's `onClick()` functionality.

```js
import { Chip } from 'suomifi-ui-components';

<>
  <Chip
    disabled
    removable
    actionLabel="Deselect item"
    onClick={() => console.log('Deselected: Finland')}
  >
    Finland
  </Chip>

  <Chip
    aria-disabled
    removable
    actionLabel="Deselect item"
    onClick={() => console.log('Deselected: Finland')}
  >
    Finland
  </Chip>
</>;
```

### Static chip

`<StaticChip>` is a Chip without the button functionality, i.e only for visual presentation.

```js
import { StaticChip } from 'suomifi-ui-components';

<StaticChip>Finland</StaticChip>;
```

## Props & methods
