ReorderableList provides an accessible way to reorder a list of items. It supports mouse drag-and-drop and up/down buttons.

The component has two modes:

- **View mode** (default): Items are displayed as a static list.
- **Edit mode**: Activated by the edit button. Items become draggable and show buttons for reordering. Instructions are shown above the list if given.

All text labels and screen reader announcements must be provided by the consumer for accessibility and i18n support.

The optional `revertButtonText` prop adds a secondary cancel button in edit mode. When clicked, it restores the order to what it was when edit mode was entered and calls `onReorder` with the original order.

Examples:

- [Basic use](./#/Components/ReorderableList?id=basic-use)
- [Items with form content](./#/Components/ReorderableList?id=items-with-form-content)
- [Small screen](./#/Components/ReorderableList?id=small-screen)
- [Move to top and move to bottom controls](./#/Components/ReorderableList?id=move-to-top-and-move-to-bottom-controls)
- [Controlled edit mode](./#/Components/ReorderableList?id=controlled-edit-mode)

<div style="margin-bottom: 5px">
  [Props & methods (ReorderableList)](./#/Components/ReorderableList?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (ReorderableListItem)](./#/Components/ReorderableList?id=reorderablelistitem)
</div>

### Basic use

```jsx
import {
  Block,
  ReorderableList,
  ReorderableListItem,
  Paragraph,
  Text,
} from 'suomifi-ui-components';

const [items, setItems] = React.useState([
  { id: 'a', title: 'Item A', description: 'Description for item A' },
  { id: 'b', title: 'Item B', description: 'Description for item B' },
  { id: 'c', title: 'Item C', description: 'Description for item C' },
  { id: 'd', title: 'Item D', description: 'Description for item D' }
]);

const handleReorder = (newOrder) => {
  const reordered = newOrder.map((key) =>
    items.find((item) => item.id === key)
  );
  setItems(reordered);
};
  <ReorderableList
    aria-label="Priority list"
    editButtonText="Edit order"
    saveButtonText="Save order"
    revertButtonText="Cancel"
    editModeInstructionHeading="Order change instructions"
    editModeInstructionText="Drag and drop or use the up/down buttons to move items."
    announcements={{
      editModeActivated: () => 'Edit mode activated',
      editModeCancelled: () => 'Edit mode cancelled',
      movedUp: (label, pos, total) =>
        `${label} moved to position ${pos} of ${total}`,
      movedDown: (label, pos, total) =>
        `${label} moved to position ${pos} of ${total}`,
      movedToPosition: (label, pos, total) =>
        `${label} moved to position ${pos} of ${total}`,
      itemsSwapped: (a, b) => `${a} and ${b} have swapped positions`,
      orderReverted: () => 'Order reverted to original'
    }}
    onReorder={handleReorder}
  >
    {items.map((item) => (
      <ReorderableListItem
        key={item.id}
        itemKey={item.id}
        ariaLabel={item.title}
        moveUpButtonAriaLabel={`Move ${item.title} up`}
        moveDownButtonAriaLabel={`Move ${item.title} down`}
      >
        <Block>
          <Text variant="bold">{item.title}</Text>
          <Paragraph>{item.description}</Paragraph>
        </Block>
      </ReorderableListItem>
    ))}
</SpacingProvider>;
```

### Inline move buttons

When the items only have a little content, it might be better to show the move up/down buttons inline with the content on the right side of the list item. This can be toggled by setting `moveButtonsPlacement="inline"`

```jsx
import {
  Block,
  ReorderableList,
  ReorderableListItem,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [items, setItems] = React.useState([
  { id: 'a', title: 'Item A', description: 'Description for item A' },
  { id: 'b', title: 'Item B', description: 'Description for item B' },
  { id: 'c', title: 'Item C', description: 'Description for item C' },
  { id: 'd', title: 'Item D', description: 'Description for item D' }
]);

const handleReorder = (newOrder) => {
  const reordered = newOrder.map((key) =>
    items.find((item) => item.id === key)
  );
  setItems(reordered);
};

<ReorderableList
  aria-label="Priority list"
  editButtonText="Edit order"
  saveButtonText="Save order"
  moveButtonsPlacement="inline"
  revertButtonText="Cancel"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Drag and drop or use the up/down buttons to move items."
  announcements={{
    editModeActivated: () => 'Edit mode activated',
    editModeCancelled: () => 'Edit mode cancelled',
    movedUp: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedDown: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedToPosition: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    itemsSwapped: (a, b) => `${a} and ${b} have swapped positions`,
    orderReverted: () => 'Order reverted to original'
  }}
  onReorder={handleReorder}
>
  {items.map((item) => (
    <ReorderableListItem
      key={item.id}
      itemKey={item.id}
      ariaLabel={item.title}
      moveUpButtonAriaLabel={`Move ${item.title} up`}
      moveDownButtonAriaLabel={`Move ${item.title} down`}
    >
      <Block>
        <Text variant="bold">{item.title}</Text>
        <Paragraph>{item.description}</Paragraph>
      </Block>
    </ReorderableListItem>
  ))}
</ReorderableList>;
```

### Items with form content

Each item can contain arbitrary content, including form elements. The component wraps whatever ReactNode is passed as children.

For long content, use `editModeChildren` to provide shorter content that is shown only in edit mode. The abbreviated content should still include enough information to identify the item while reordering, such as a name and one or two stable details.

```jsx
import {
  Block,
  ReorderableList,
  ReorderableListItem,
  TextInput,
  Dropdown,
  DropdownItem,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [members, setMembers] = React.useState([
  {
    id: 'member-1',
    name: 'Matti Meikäläinen',
    role: 'admin',
    email: 'matti@example.fi'
  },
  {
    id: 'member-2',
    name: 'Maija Meikäläinen',
    role: 'editor',
    email: 'maija@example.fi'
  },
  {
    id: 'member-3',
    name: 'Teppo Testaaja',
    role: 'viewer',
    email: 'teppo@example.fi'
  }
]);

const handleReorder = (newOrder) => {
  const reordered = newOrder.map((key) =>
    members.find((m) => m.id === key)
  );
  setMembers(reordered);
};
<ReorderableList
  aria-label="Team members"
  editButtonText="Edit order"
  saveButtonText="Save order"
  revertButtonText="Cancel"
  moveButtonsPlacement="inline"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Drag and drop or use the up/down buttons to move items."
  announcements={{
    editModeActivated: () => 'Edit mode activated.',
    editModeCancelled: () => 'Edit mode cancelled.',
    movedUp: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedDown: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedToPosition: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    itemsSwapped: (a, b) => `${a} and ${b} have swapped positions`,
    orderReverted: () => 'Order reverted to original'
  }}
  onReorder={handleReorder}
>
  {members.map((member) => (
    <ReorderableListItem
      key={member.id}
      itemKey={member.id}
      ariaLabel={member.name}
      moveUpButtonAriaLabel={`Move ${member.name} up`}
      moveDownButtonAriaLabel={`Move ${member.name} down`}
      editModeChildren={
        <Block>
          <Text variant="bold">{member.name}</Text>
          <Paragraph>{member.email}</Paragraph>
          <Paragraph>Role: {member.role}</Paragraph>
        </Block>
      }
    >
      <Block
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1,
          padding: '8px 0'
        }}
      >
        <TextInput labelText="Name" defaultValue={member.name} />
        <TextInput labelText="Email" defaultValue={member.email} />
        <Dropdown labelText="Role" defaultValue={member.role}>
          <DropdownItem value="admin">Admin</DropdownItem>
          <DropdownItem value="editor">Editor</DropdownItem>
          <DropdownItem value="viewer">Viewer</DropdownItem>
        </Dropdown>
        <TextInput
          labelText="Notes"
          defaultValue={`Additional notes for ${member.name}`}
        />
      </Block>
    </ReorderableListItem>
  ))}
</ReorderableList>;
```

### Small screen

Set `smallScreen` to `true` on narrower screens. This reduces the spacing slightly to save horizontal space. In the small screen layout always keep the move button placement at the default value of `top`.

```jsx
import {
  Block,
  ReorderableList,
  ReorderableListItem,
  TextInput,
  Dropdown,
  DropdownItem,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [members, setMembers] = React.useState([
  {
    id: 'member-1',
    name: 'Matti Meikäläinen',
    role: 'admin',
    email: 'matti@example.fi'
  },
  {
    id: 'member-2',
    name: 'Maija Meikäläinen',
    role: 'editor',
    email: 'maija@example.fi'
  },
  {
    id: 'member-3',
    name: 'Teppo Testaaja',
    role: 'viewer',
    email: 'teppo@example.fi'
  }
]);

const handleReorder = (newOrder) => {
  const reordered = newOrder.map((key) =>
    members.find((m) => m.id === key)
  );
  setMembers(reordered);
};
<ReorderableList
  smallScreen
  aria-label="Team members"
  editButtonText="Edit order"
  saveButtonText="Save order"
  revertButtonText="Cancel"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Drag and drop or use the up/down buttons to move items."
  announcements={{
    editModeActivated: () => 'Edit mode activated.',
    editModeCancelled: () => 'Edit mode cancelled.',
    movedUp: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedDown: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedToPosition: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    itemsSwapped: (a, b) => `${a} and ${b} have swapped positions`,
    orderReverted: () => 'Order reverted to original'
  }}
  onReorder={handleReorder}
>
  {members.map((member) => (
    <ReorderableListItem
      key={member.id}
      itemKey={member.id}
      ariaLabel={member.name}
      moveUpButtonAriaLabel={`Move ${member.name} up`}
      moveDownButtonAriaLabel={`Move ${member.name} down`}
      editModeChildren={
        <Block>
          <Text variant="bold">{member.name}</Text>
          <Paragraph>{member.email}</Paragraph>
          <Paragraph>Role: {member.role}</Paragraph>
        </Block>
      }
    >
      <Block
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1,
          padding: '8px 0'
        }}
      >
        <TextInput labelText="Name" defaultValue={member.name} />
        <TextInput labelText="Email" defaultValue={member.email} />
        <Dropdown labelText="Role" defaultValue={member.role}>
          <DropdownItem value="admin">Admin</DropdownItem>
          <DropdownItem value="editor">Editor</DropdownItem>
          <DropdownItem value="viewer">Viewer</DropdownItem>
        </Dropdown>
        <TextInput
          labelText="Notes"
          defaultValue={`Additional notes for ${member.name}`}
        />
      </Block>
    </ReorderableListItem>
  ))}
</ReorderableList>;
```

### Move to top and move to bottom controls

Enable direct top and bottom movement buttons with `showMoveToTopButton` and `showMoveToBottomButton`. The example below also uses `moveButtonsPlacement="top"` so the buttons are shown as a toolbar above each item's content.

```jsx
import {
  Block,
  ReorderableList,
  ReorderableListItem,
  Paragraph,
  Text
} from 'suomifi-ui-components';

const [items, setItems] = React.useState([
  { id: 'a', title: 'Item A', description: 'Description for item A' },
  { id: 'b', title: 'Item B', description: 'Description for item B' },
  { id: 'c', title: 'Item C', description: 'Description for item C' },
  { id: 'd', title: 'Item D', description: 'Description for item D' }
]);

const handleReorder = (newOrder) => {
  const reordered = newOrder.map((key) =>
    items.find((item) => item.id === key)
  );
  setItems(reordered);
};

<ReorderableList
  aria-label="Priority list"
  editButtonText="Edit order"
  saveButtonText="Save order"
  revertButtonText="Cancel"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Use the buttons to move items."
  showMoveToTopButton
  showMoveToBottomButton
  moveButtonsPlacement="top"
  announcements={{
    editModeActivated: () => 'Edit mode activated',
    editModeCancelled: () => 'Edit mode cancelled',
    movedUp: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedDown: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedToPosition: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    itemsSwapped: (a, b) => `${a} and ${b} have swapped positions`,
    orderReverted: () => 'Order reverted to original'
  }}
  onReorder={handleReorder}
>
  {items.map((item) => (
    <ReorderableListItem
      key={item.id}
      itemKey={item.id}
      ariaLabel={item.title}
      moveUpButtonAriaLabel={`Move ${item.title} up`}
      moveDownButtonAriaLabel={`Move ${item.title} down`}
      moveToTopButtonAriaLabel={`Move ${item.title} to top`}
      moveToBottomButtonAriaLabel={`Move ${item.title} to bottom`}
    >
      <Block>
        <Text variant="bold">{item.title}</Text>
        <Paragraph>{item.description}</Paragraph>
      </Block>
    </ReorderableListItem>
  ))}
</ReorderableList>;
```

### Controlled edit mode

The edit mode can be controlled externally using `editMode` and `onEditModeChange` props.

```jsx
import {
  ReorderableList,
  ReorderableListItem
} from 'suomifi-ui-components';

const [editMode, setEditMode] = React.useState(false);
const [items, setItems] = React.useState([
  { id: '1', title: 'First' },
  { id: '2', title: 'Second' },
  { id: '3', title: 'Third' }
]);

const handleReorder = (newOrder) => {
  const reordered = newOrder.map((key) =>
    items.find((item) => item.id === key)
  );
  setItems(reordered);
};

<ReorderableList
  aria-label="Controlled list"
  editButtonText="Edit"
  saveButtonText="Save order"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Drag and drop or use the up/down buttons to move items."
  announcements={{
    editModeActivated: () => 'Edit mode on',
    editModeCancelled: () => 'Edit mode off',
    movedUp: (label, pos) => `${label} is now at position ${pos}`,
    movedDown: (label, pos) => `${label} is now at position ${pos}`,
    movedToPosition: (label, pos) =>
      `${label} is now at position ${pos}`,
    itemsSwapped: (a, b) => `Swapped ${a} and ${b}`
  }}
  editMode={editMode}
  onEditModeChange={setEditMode}
  onReorder={handleReorder}
>
  {items.map((item) => (
    <ReorderableListItem
      key={item.id}
      itemKey={item.id}
      ariaLabel={item.title}
      moveUpButtonAriaLabel={`Move ${item.title} up`}
      moveDownButtonAriaLabel={`Move ${item.title} down`}
    >
      {item.title}
    </ReorderableListItem>
  ))}
</ReorderableList>;
```

### Props & methods

ReorderableList component supports [margin props](./#/Spacing/Margin%20props) for spacing.
