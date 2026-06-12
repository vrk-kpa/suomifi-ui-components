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

const TestList = (props: {
  onReorder?: (order: string[]) => void;
  showMoveToTopButton?: boolean;
  showMoveToBottomButton?: boolean;
  moveButtonsPlacement?: 'inline' | 'top';
}) => (
  <ReorderableList
    aria-label="Test list"
    editButtonText="Edit"
    saveButtonText="Cancel"
    editModeInstructionHeading="Keyboard instructions"
    editModeInstructionText="Use arrow keys to navigate."
    announcements={defaultAnnouncements}
    onReorder={props.onReorder || jest.fn()}
    showMoveToTopButton={props.showMoveToTopButton}
    showMoveToBottomButton={props.showMoveToBottomButton}
    moveButtonsPlacement={props.moveButtonsPlacement}
    data-testid="reorderable-list"
  >
    <ReorderableListItem
      itemKey="a"
      ariaLabel="Item A"
      moveUpButtonAriaLabel="Move Item A up"
      moveDownButtonAriaLabel="Move Item A down"
      moveToTopButtonAriaLabel="Move Item A to top"
      moveToBottomButtonAriaLabel="Move Item A to bottom"
    >
      <span>Item A content</span>
    </ReorderableListItem>
    <ReorderableListItem
      itemKey="b"
      ariaLabel="Item B"
      moveUpButtonAriaLabel="Move Item B up"
      moveDownButtonAriaLabel="Move Item B down"
      moveToTopButtonAriaLabel="Move Item B to top"
      moveToBottomButtonAriaLabel="Move Item B to bottom"
    >
      <span>Item B content</span>
    </ReorderableListItem>
    <ReorderableListItem
      itemKey="c"
      ariaLabel="Item C"
      moveUpButtonAriaLabel="Move Item C up"
      moveDownButtonAriaLabel="Move Item C down"
      moveToTopButtonAriaLabel="Move Item C to top"
      moveToBottomButtonAriaLabel="Move Item C to bottom"
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

  it('should hide move to top and bottom buttons by default', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    await user.click(screen.getByText('Edit'));

    expect(
      screen.queryByLabelText('Move Item A to top'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Move Item A to bottom'),
    ).not.toBeInTheDocument();
  });

  it('should show move to top and bottom buttons when enabled', async () => {
    const user = userEvent.setup();
    render(<TestList showMoveToTopButton showMoveToBottomButton />);

    await user.click(screen.getByText('Edit'));

    expect(screen.getByLabelText('Move Item A to top')).toBeInTheDocument();
    expect(screen.getByLabelText('Move Item A to bottom')).toBeInTheDocument();
    expect(screen.getByLabelText('Move Item B to top')).toBeInTheDocument();
    expect(screen.getByLabelText('Move Item C to bottom')).toBeInTheDocument();
  });

  it('should apply aria-disabled to boundary buttons', async () => {
    const user = userEvent.setup();
    render(<TestList />);

    await user.click(screen.getByText('Edit'));

    const moveToTopButton = screen.getByLabelText('Move Item A up');
    const moveToBottomButton = screen.getByLabelText('Move Item C down');

    expect(moveToTopButton).toHaveAttribute('aria-disabled', 'true');
    expect(moveToBottomButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('should reorder items when move buttons are clicked', async () => {
    const onReorder = jest.fn();
    const user = userEvent.setup();
    render(<TestList onReorder={onReorder} />);

    await user.click(screen.getByText('Edit'));
    await user.click(screen.getByLabelText('Move Item A down'));

    expect(onReorder).toHaveBeenCalledWith(['b', 'a', 'c']);
  });

  it('should reorder items when move to top and bottom buttons are clicked', async () => {
    const onReorder = jest.fn();
    const user = userEvent.setup();
    render(
      <TestList
        onReorder={onReorder}
        showMoveToTopButton
        showMoveToBottomButton
      />,
    );

    await user.click(screen.getByText('Edit'));
    await user.click(screen.getByLabelText('Move Item C to top'));
    await user.click(screen.getByLabelText('Move Item A to bottom'));

    expect(onReorder).toHaveBeenNthCalledWith(1, ['c', 'a', 'b']);
    expect(onReorder).toHaveBeenNthCalledWith(2, ['c', 'b', 'a']);
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

  it('should announce when moved to top or bottom', async () => {
    const user = userEvent.setup();
    render(<TestList showMoveToTopButton showMoveToBottomButton />);

    await user.click(screen.getByText('Edit'));
    await user.click(screen.getByLabelText('Move Item C to top'));

    const liveRegion = document.querySelector(
      '.fi-reorderable-list_live-region',
    );
    await waitFor(() => {
      expect(liveRegion?.textContent).toContain(
        'Item C moved to position 1 of 3',
      );
    });
  });

  it('should render toolbar buttons first in content wrapper when top placement is used', async () => {
    const user = userEvent.setup();
    render(
      <TestList
        showMoveToTopButton
        showMoveToBottomButton
        moveButtonsPlacement="top"
      />,
    );

    await user.click(screen.getByText('Edit'));

    const item = screen.getByLabelText('Item A');
    const inner = item.querySelector('.fi-reorderable-list-item_inner');
    const dragHandle = item.querySelector(
      '.fi-reorderable-list-item_drag-handle',
    );
    const contentWrapper = item.querySelector(
      '.fi-reorderable-list-item_content-wrapper',
    );
    const buttons = item.querySelector('.fi-reorderable-list-item_buttons');

    expect(item).toHaveClass('fi-reorderable-list-item--buttons-top');
    expect(buttons).toHaveClass('fi-reorderable-list-item_buttons--top');
    expect(inner?.firstElementChild).toBe(dragHandle);
    expect(inner?.lastElementChild).toBe(contentWrapper);
    expect(contentWrapper?.firstElementChild).toBe(buttons);
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
        saveButtonText="Cancel"
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
