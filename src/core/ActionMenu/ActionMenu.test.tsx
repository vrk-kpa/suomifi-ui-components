import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { ActionMenu, ActionMenuProps } from '../ActionMenu';
import { ActionMenuItem } from '../ActionMenu/ActionMenuItem';
import { ActionMenuDivider } from '../ActionMenu/ActionMenuDivider/ActionMenuDivider';
import { axeTest } from '../../utils/test';

const actionMenuProps: ActionMenuProps = {
  buttonText: 'Actions',
  name: 'am-test-name',
  className: 'am-test',
  id: 'test-id',
  wrapperProps: {
    id: 'wrapper-id',
    'data-testid': 'action-menu-test-id',
  },
};

const TestActionMenu = (props: ActionMenuProps) => (
  <ActionMenu {...props}>
    <ActionMenuItem>Item 1</ActionMenuItem>
    <ActionMenuItem>Item 2</ActionMenuItem>
    <ActionMenuDivider />
    <ActionMenuItem href="/testpath">Item 3</ActionMenuItem>
  </ActionMenu>
);

describe('Basic ActionMenu', () => {
  const BasicActionMenu = TestActionMenu(actionMenuProps);

  it('should have provided ids', async () => {
    const { findByRole, findByTestId } = render(BasicActionMenu);
    const wrapperDiv = await findByTestId('action-menu-test-id');
    expect(wrapperDiv).toBeTruthy();
    expect(wrapperDiv).toHaveAttribute('id', 'wrapper-id');
    const button = await findByRole('button');
    expect(button).toHaveAttribute('id', 'test-id');
    expect(button).toHaveAttribute('name', 'am-test-name');
  });

  it('should have button text', async () => {
    const { findByRole } = render(BasicActionMenu);
    const button = await findByRole('button');
    expect(button).toHaveTextContent('Actions');
  });

  it('should match snapshot', async () => {
    const { baseElement, getByRole } = render(BasicActionMenu);
    const menuButton = getByRole('button') as HTMLButtonElement;
    expect(baseElement).toMatchSnapshot();
    await act(async () => {
      fireEvent.click(menuButton);
    });
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Disabled ActionMenu', () => {
  const modProps: ActionMenuProps = {
    ...actionMenuProps,
    disabled: true,
  };

  const BasicActionMenu = TestActionMenu(modProps);

  it('should have disabled styles when disabled', async () => {
    const { findByRole } = render(BasicActionMenu);
    const button = await findByRole('button');
    expect(button).toHaveClass('fi-action-menu_button--disabled');
  });

  it('should have aria-disabled when disabled', async () => {
    const { findByRole } = render(BasicActionMenu);
    const button = await findByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('should match snapshot', async () => {
    const { baseElement } = render(BasicActionMenu);
    expect(baseElement).toMatchSnapshot();
  });
});

describe('No borders variant', () => {
  const modProps: ActionMenuProps = {
    ...actionMenuProps,
    buttonVariant: 'secondaryNoBorder',
    'aria-label': 'ActionMenuTest',
  };

  const BorderlessActionMenu = TestActionMenu(modProps);

  it('should match snapshot', async () => {
    const { baseElement } = render(BorderlessActionMenu);
    expect(baseElement).toMatchSnapshot();
  });
});

describe('movement in ActionMenu', () => {
  const BasicActionMenu = TestActionMenu(actionMenuProps);

  it('should match snapshot', async () => {
    const { baseElement, getByRole } = render(BasicActionMenu);
    const menuButton = getByRole('button') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(menuButton);

      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    });

    await act(async () => {
      fireEvent.keyPress(baseElement, {
        key: 'ArrowDown',
      });

      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
    });

    expect(baseElement).toMatchSnapshot();
  });
});

describe('ActionMenu', () => {
  // Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
  it('should not have basic accessibility issues', async () => {
    await act(async () => {
      axeTest(TestActionMenu(actionMenuProps), {
        rules: {
          'aria-valid-attr-value': {
            enabled: false,
          },
        },
      });
    });
  });
});
