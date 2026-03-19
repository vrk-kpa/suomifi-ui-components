import React from 'react';
import { render, screen } from '@testing-library/react';
import { axeTest } from '../../../utils/test';
import { ReorderableList } from '../ReorderableList/ReorderableList';
import { ReorderableListItem } from './ReorderableListItem';

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

const TestItemInList = (
  <ReorderableList
    aria-label="Test list"
    editButtonText="Edit"
    cancelButtonText="Cancel"
    editModeInstructionHeading="Instructions"
    editModeInstructionText="Use arrows."
    announcements={defaultAnnouncements}
    onReorder={jest.fn()}
  >
    <ReorderableListItem
      itemKey="item1"
      ariaLabel="First item"
      moveUpButtonAriaLabel="Move first item up"
      moveDownButtonAriaLabel="Move first item down"
      data-testid="item-1"
    >
      <div>
        <strong>Title</strong>
        <p>Description text</p>
      </div>
    </ReorderableListItem>
    <ReorderableListItem
      itemKey="item2"
      ariaLabel="Second item"
      moveUpButtonAriaLabel="Move second item up"
      moveDownButtonAriaLabel="Move second item down"
      data-testid="item-2"
    >
      <div>Second item content</div>
    </ReorderableListItem>
  </ReorderableList>
);

describe('ReorderableListItem', () => {
  it('should render children content', () => {
    render(TestItemInList);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
    expect(screen.getByText('Second item content')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(TestItemInList);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', axeTest(TestItemInList));

  it('should apply data-testid', () => {
    render(TestItemInList);
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
  });
});
