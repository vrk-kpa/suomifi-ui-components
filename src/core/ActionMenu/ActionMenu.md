`<ActionMenu>` is used for selecting an action if the amount of available actions is so great regular `<Button>` elements would clutter the UI

Examples:

<ul>
  <li><a href="/#/Components/ActionMenu?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/ActionMenu?id=with-icon-only">With icon only</a></li>
  <li><a href="/#/Components/ActionMenu?id=full-width">Full width</a></li>
  <li><a href="/#/Components/ActionMenu?id=disabled">Disabled</a></li>
  <li><a href="/#/Components/ActionMenu?id=icons-and-dividers-in-the-list">Icons and dividers in the list</a></li>
  <li><a href="/#/Components/ActionMenu?id=button-variants">Button variants</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/ActionMenu?id=props--methods">Props & methods (ActionMenu)</a>
</div>
<div style="margin-bottom: 5px">
  <a href="/#/Components/ActionMenu?id=actionmenuitem">Props & methods (ActionMenuItem)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/ActionMenu?id=actionmenudivider">Props & methods (ActionMenuDivider)</a>
</div>

### Basic use

```js
import { ActionMenu, ActionMenuItem } from 'suomifi-ui-components';

<ActionMenu buttonText="Actions">
  <ActionMenuItem onClick={() => console.log('Copy')}>
    Copy
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Edit')}>
    Edit
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Move')}>
    Move
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Remove')}>
    Remove
  </ActionMenuItem>
</ActionMenu>;
```

### With icon only

When the `buttonText` prop is absent, the ActionMenu button will render with a vertical dot icon as its content.

In this scenario it is very important to add an `aria-label` to describe the button's purpose for assistive technologies.

```js
import { ActionMenu, ActionMenuItem } from 'suomifi-ui-components';

<ActionMenu aria-label="Actions">
  <ActionMenuItem onClick={() => console.log('Copy')}>
    Copy
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Edit')}>
    Edit
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Move')}>
    Move
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Remove')}>
    Remove
  </ActionMenuItem>
</ActionMenu>;
```

### Full width

Use fullwidth ActionMenu on narrower screens (mobile devices)

```js
import { ActionMenu, ActionMenuItem } from 'suomifi-ui-components';

<ActionMenu buttonText="Actions" fullWidth>
  <ActionMenuItem onClick={() => console.log('Copy')}>
    Copy
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Edit')}>
    Edit
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Move')}>
    Move
  </ActionMenuItem>
  <ActionMenuItem onClick={() => console.log('Remove')}>
    Remove
  </ActionMenuItem>
</ActionMenu>;
```

### Disabled

The entire menu or individual actions can be disabled

```js
import { ActionMenu, ActionMenuItem } from 'suomifi-ui-components';

<>
  <ActionMenu buttonText="Actions" disabled>
    <ActionMenuItem onClick={() => console.log('Copy')}>
      Copy
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Edit')}>
      Edit
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Move')}>
      Move
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Remove')}>
      Remove
    </ActionMenuItem>
  </ActionMenu>

  <ActionMenu buttonText="Actions">
    <ActionMenuItem onClick={() => console.log('Copy')}>
      Copy
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Edit')}>
      Edit
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Move')}>
      Move
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Remove')} disabled>
      Remove
    </ActionMenuItem>
  </ActionMenu>
</>;
```

### Icons and dividers in the list

An `<ActionMenuItem>` can have an icon inside it for enhanced visual clarity.

The action list can also have `<ActionMenuDivider>` components to visually group certain actions together.

```js
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuDivider,
  IconCopy,
  IconEdit,
  IconGrid,
  IconRemove
} from 'suomifi-ui-components';

<ActionMenu buttonText="Actions">
  <ActionMenuItem
    onClick={() => console.log('Copy')}
    icon={<IconCopy />}
  >
    Copy
  </ActionMenuItem>
  <ActionMenuItem
    onClick={() => console.log('Edit')}
    icon={<IconEdit />}
  >
    Edit
  </ActionMenuItem>
  <ActionMenuItem
    onClick={() => console.log('Move')}
    icon={<IconGrid />}
  >
    Move
  </ActionMenuItem>
  <ActionMenuDivider />
  <ActionMenuItem
    onClick={() => console.log('Remove')}
    icon={<IconRemove />}
  >
    Remove
  </ActionMenuItem>
</ActionMenu>;
```

### Button variants

You can change the appearance of the menu toggle button with the `buttonVariant` prop.

```js
import { ActionMenu, ActionMenuItem } from 'suomifi-ui-components';

<>
  <ActionMenu buttonText="Actions" buttonVariant="default">
    <ActionMenuItem onClick={() => console.log('Copy')}>
      Copy
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Edit')}>
      Edit
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Move')}>
      Move
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Remove')}>
      Remove
    </ActionMenuItem>
  </ActionMenu>

  <ActionMenu aria-label="Actions" buttonVariant="secondaryNoBorder">
    <ActionMenuItem onClick={() => console.log('Copy')}>
      Copy
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Edit')}>
      Edit
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Move')}>
      Move
    </ActionMenuItem>
    <ActionMenuItem onClick={() => console.log('Remove')}>
      Remove
    </ActionMenuItem>
  </ActionMenu>
</>;
```

## Props & methods
