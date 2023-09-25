`<ActionMenu>` is used for selecting an action if the amount of available actions is so great regular `<Button>` elements would clutter the UI

Examples:

- [Basic use](./#/Components/ActionMenu?id=basic-use)
- [With icon only](./#/Components/ActionMenu?id=with-icon-only)
- [Full width](./#/Components/ActionMenu?id=full-width)
- [Disabled](./#/Components/ActionMenu?id=disabled)
- [Icons and dividers in the list](./#/Components/ActionMenu?id=icons-and-dividers-in-the-list)
- [Button variants](./#/Components/ActionMenu?id=button-variants)

<div style="margin-bottom: 5px">
 [Props & methods (ActionMenu)](./#/Components/ActionMenu?id=props--methods)
</div>
<div style="margin-bottom: 5px">
 [Props & methods (ActionMenuItem)](./#/Components/ActionMenu?id=actionmenuitem)
</div>
<div style="margin-bottom: 40px">
 [Props & methods (ActionMenuDivider)](./#/Components/ActionMenu?id=actionmenudivider)
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

In this scenario it is very important to add an `aria-label` to describe the button's purpose for assistive technology.

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

### Props & methods

ActionMenu component supports [margin props](./#/Spacing/Margin%20props) for spacing.
