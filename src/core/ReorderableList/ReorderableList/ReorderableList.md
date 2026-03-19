ReorderableList provides an accessible way to reorder a list of items. It supports mouse drag-and-drop and keyboard-accessible up/down buttons.

The component has two modes:

- **View mode** (default): Items are displayed as a static list.
- **Edit mode**: Activated by the edit button. Items become draggable and show up/down buttons for reordering. Keyboard instructions are shown above the list.

All text labels and screen reader announcements must be provided by the consumer for full i18n support.

```jsx
import {
  ReorderableList,
  ReorderableListItem
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
  cancelButtonText="Save order"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Drag and drop or use the arrow buttons to move items. Press 'done' when finished."
  announcements={{
    editModeActivated: () => 'Edit mode activated',
    editModeCancelled: () => 'Edit mode cancelled',
    movedUp: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedDown: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedToPosition: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    cannotMoveUp: (label) => `${label} is already at the top`,
    cannotMoveDown: (label) => `${label} is already at the bottom`,
    itemsSwapped: (a, b) => `${a} and ${b} have swapped positions`
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
      <div>
        <strong>{item.title}</strong>
        <p style={{ margin: '4px 0 0' }}>{item.description}</p>
      </div>
    </ReorderableListItem>
  ))}
</ReorderableList>;
```

### Items with form content

Each item can contain arbitrary content, including form elements. The component wraps whatever ReactNode is passed as children.

```jsx
import {
  ReorderableList,
  ReorderableListItem,
  TextInput,
  Dropdown,
  DropdownItem
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
  cancelButtonText="Save order"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Drag and drop or use the arrow buttons to move items. Press 'done' when finished."
  announcements={{
    editModeActivated: () =>
      'Edit mode activated. Use arrow keys to reorder.',
    editModeCancelled: () => 'Edit mode cancelled.',
    movedUp: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedDown: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    movedToPosition: (label, pos, total) =>
      `${label} moved to position ${pos} of ${total}`,
    cannotMoveUp: (label) => `${label} is already first`,
    cannotMoveDown: (label) => `${label} is already last`,
    itemsSwapped: (a, b) => `${a} and ${b} have swapped positions`
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
    >
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          flex: 1,
          padding: '8px 0'
        }}
      >
        <TextInput
          labelText="Name"
          defaultValue={member.name}
          style={{ flex: '1 1 200px' }}
        />
        <TextInput
          labelText="Email"
          defaultValue={member.email}
          style={{ flex: '1 1 200px' }}
        />
        <Dropdown
          labelText="Role"
          defaultValue={member.role}
          style={{ flex: '0 1 160px' }}
        >
          <DropdownItem value="admin">Admin</DropdownItem>
          <DropdownItem value="editor">Editor</DropdownItem>
          <DropdownItem value="viewer">Viewer</DropdownItem>
        </Dropdown>
      </div>
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
  cancelButtonText="Save order"
  editModeInstructionHeading="Order change instructions"
  editModeInstructionText="Drag and drop or use the arrow buttons to move items. Press 'done' when finished."
  announcements={{
    editModeActivated: () => 'Edit mode on',
    editModeCancelled: () => 'Edit mode off',
    movedUp: (label, pos) => `${label} is now at position ${pos}`,
    movedDown: (label, pos) => `${label} is now at position ${pos}`,
    movedToPosition: (label, pos) =>
      `${label} is now at position ${pos}`,
    cannotMoveUp: (label) => `${label} cannot move up`,
    cannotMoveDown: (label) => `${label} cannot move down`,
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
