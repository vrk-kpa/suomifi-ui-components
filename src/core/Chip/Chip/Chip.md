The `<Chip>` component is used when you want to present concise information in a clear visually prominent way, for example to display the selected values of a listbox. In its most typical usecase, the Chip is a button with a "remove" icon.

Examples:

- [Basic use](./#/Components/Chip?id=basic-use)
- [Without remove icon](./#/Components/Chip?id=without-remove-icon)
- [Disabled](./#/Components/Chip?id=disabled)
- [Static chip](./#/Components/Chip?id=static-chip)

<div style="margin-bottom: 5px">
  [Props & methods (Chip)](./#/Components/Chip?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (StaticChip)](./#/Components/Chip?id=staticchip)
</div>

### Basic use

It is important to set the `actionLabel` text so that can describe the function of the Chip.

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

### Props & methods
