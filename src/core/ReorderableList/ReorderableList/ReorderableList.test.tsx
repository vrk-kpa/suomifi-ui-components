import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axeTest } from '../../../utils/test';
import { ReorderableList } from './ReorderableList';
import { ReorderableListItem } from '../ReorderableListItem/ReorderableListItem';

const defaultAnnouncements = {
  editModeActivated: () => 'Edit mode activated',
  editModeCancelled: () => 'Edit mode cancelled',
  movedUp: (label: string, pos: number, total: number) =>
    `${label} moved to position ${pos} of ${total}`,
  movedDown: (label: string, pos: number, total: number) =>
    `${label} moved to position ${pos} of ${total}`,
  movedToPosition: (label: string, pos: number, total: number) =>
    `${label} moved to position ${pos} of ${total}`,
  cannotMoveUp: (label: string) => `${label} is already at the top`,
  cannotMoveDown: (label: string) => `${label} is already at the bottom`,
  itemsSwapped: (a: string, b: string) => `${a} and ${b} swapped`,
};

const TestList = (props: { onReorder?: (order: string[]) => void }) => (
  <ReorderableList
    aria-label="Test list"
    editButtonText="Edit"
    cancelButtonText="Cancel"
    editModeInstructionHeading="Keyboard instructions"
    editModeInstructionText="Use arrow keys to navigate."
    announcements={defaultAnnouncements}
    onReorder={props.onReorder || jest.fn()}
    data-testid="reorderable-list"
  >
    <ReorderableListItem
      itemKey="a"
      ariaLabel="Item A"
      moveUpButtonAriaLabel="Move Item A up"
      moveDownButtonAriaLabel="Move Item A down"
    >
      <span>Item A content</span>
    </ReorderableListItem>
    <ReorderableListItem
      itemKey="b"
      ariaLabel="Item B"
      moveUpButtonAriaLabel="Move Item B up"
      moveDownButtonAriaLabel="Move Item B down"
    >
      <span>Item B content</span>
    </ReorderableListItem>
    <ReorderableListItem
      itemKey="c"
      ariaLabel="Item C"
      moveUpButtonAriaLabel="Move Item C up"
      moveDownButtonAriaLabel="Move Item C down"
    >
      <span>Item C content</span>
    </ReorderableListItem>
  </ReorderableList>
);

describe('ReorderableList', () => {
  it('should render in view mode by default', () => {
    render(<TestList />);
    expect(screen.getByText('Item A content')).toBeInTheDocument();
    expect(screen.getByText('Item B content')).toBeInTheDocument();
    expect(screen.getByText('Item C content')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<TestList />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it(
    'should not have basic accessibility issues in view mode',
    axeTest(<TestList />),
  );

  it('should toggle to edit mode on button click', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    const editButton = screen.getByText('Edit');
    await user.click(editButton);

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Keyboard instructions')).toBeInTheDocument();
    expect(screen.getByText('Use arrow keys to navigate.')).toBeInTheDocument();
  });

  it('should show move buttons in edit mode', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    await user.click(screen.getByText('Edit'));

    expect(screen.getByLabelText('Move Item A up')).toBeInTheDocument();
    expect(screen.getByLabelText('Move Item A down')).toBeInTheDocument();
    expect(screen.getByLabelText('Move Item B up')).toBeInTheDocument();
    expect(screen.getByLabelText('Move Item C down')).toBeInTheDocument();
  });

  it('should style boundary buttons differently', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    await user.click(screen.getByText('Edit'));

    const upButtonA = screen.getByLabelText('Move Item A up');
    const downButtonC = screen.getByLabelText('Move Item C down');

    expect(
      upButtonA.closest('.fi-reorderable-list-item_button--boundary'),
    ).toBeTruthy();
    expect(
      downButtonC.closest('.fi-reorderable-list-item_button--boundary'),
    ).toBeTruthy();
  });

  it('should reorder items when move buttons are clicked', async () => {
    const onReorder = jest.fn();
    const user = userEvent.setup();
    render(<TestList onReorder={onReorder} />);

    await user.click(screen.getByText('Edit'));
    await user.click(screen.getByLabelText('Move Item A down'));

    expect(onReorder).toHaveBeenCalledWith(['b', 'a', 'c']);
  });

  it('should announce when moved', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    await user.click(screen.getByText('Edit'));
    await user.click(screen.getByLabelText('Move Item B down'));

    const liveRegion = document.querySelector(
      '.fi-reorderable-list_live-region',
    );
    await waitFor(() => {
      expect(liveRegion?.textContent).toContain('Item B moved to position');
    });
  });

  it('should announce when item cannot move further', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    await user.click(screen.getByText('Edit'));
    await waitFor(() => {
      expect(
        document.querySelector('.fi-reorderable-list_live-region')?.textContent,
      ).toContain('Edit mode activated');
    });

    await user.click(screen.getByLabelText('Move Item A up'));

    await waitFor(() => {
      expect(
        document.querySelector('.fi-reorderable-list_live-region')?.textContent,
      ).toContain('Item A is already at the top');
    });
  });

  it('should return to view mode on cancel', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    await user.click(screen.getByText('Edit'));
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    await user.click(screen.getByText('Cancel'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.queryByText('Keyboard instructions')).not.toBeInTheDocument();
  });

  it('should accept a custom id', () => {
    render(
      <ReorderableList
        id="custom-id"
        aria-label="Custom"
        editButtonText="Edit"
        cancelButtonText="Cancel"
        editModeInstructionHeading="Instructions"
        editModeInstructionText="Use arrows."
        announcements={defaultAnnouncements}
        onReorder={jest.fn()}
      >
        <ReorderableListItem
          itemKey="x"
          ariaLabel="X"
          moveUpButtonAriaLabel="Up"
          moveDownButtonAriaLabel="Down"
        >
          X
        </ReorderableListItem>
      </ReorderableList>,
    );
    expect(document.getElementById('custom-id')).toBeInTheDocument();
  });
});
