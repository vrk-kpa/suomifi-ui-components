import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { ActionMenu, ActionMenuProps } from '../ActionMenu';
import { ActionMenuItem } from '../ActionMenu/ActionMenuItem';
import { ActionMenuDivider } from '../ActionMenu/ActionMenuDivider/ActionMenuDivider';
import { axeTest } from '../../utils/test';

const actionMenuProps: ActionMenuProps = {
  buttonText: 'Actions',
  name: 'am-test-name',
  className: 'am-test',
  id: 'test-id',
  'aria-label': 'am-test',
};

const TestActionMenu = (props: ActionMenuProps) => (
  <ActionMenu {...props}>
    <ActionMenuItem>Item 1</ActionMenuItem>
    <ActionMenuItem>Item 2</ActionMenuItem>
    <ActionMenuDivider />
    <ActionMenuItem>Item 3</ActionMenuItem>
  </ActionMenu>
);

describe('Basic ActionMenu', () => {
  const BasicActionMenu = TestActionMenu(actionMenuProps);

  it('should have provided ids', async () => {
    const { findByRole } = render(BasicActionMenu);
    const button = await findByRole('button');
    await waitFor(() => {
      expect(button).toHaveAttribute('id', 'test-id');
      expect(button).toHaveAttribute('name', 'am-test-name');
    });
  });

  it('should have button text', async () => {
    const { findByRole } = render(BasicActionMenu);
    const button = await findByRole('button');
    await waitFor(() => {
      expect(button).toHaveTextContent('Actions');
    });
  });

  it('should match snapshot', async () => {
    const { baseElement } = render(BasicActionMenu);
    await waitFor(() => {
      expect(baseElement).toMatchSnapshot();
    });
  });
});

describe('Disabled ActionMenu', () => {
  const modProps: ActionMenuProps = {
    ...actionMenuProps,
    disabled: true,
  };

  const BasicActionMenu = TestActionMenu(modProps);

  it('should have disabled attributes when disabled', async () => {
    const { findByRole } = render(BasicActionMenu);
    const button = await findByRole('button');
    await waitFor(() => {
      expect(button).toHaveClass('fi-button--disabled');
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  it('should match snapshot', async () => {
    const { baseElement } = render(BasicActionMenu);
    await waitFor(() => {
      expect(baseElement).toMatchSnapshot();
    });
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
    await waitFor(() => {
      expect(baseElement).toMatchSnapshot();
    });
  });
});

describe('Margin prop', () => {
  it('should have margin style from margin prop', async () => {
    const { container } = render(
      TestActionMenu({ ...actionMenuProps, margin: 'xs' }),
    );
    await waitFor(() => {
      expect(container.firstChild).toHaveStyle('margin: 10px');
    });
  });

  it('should have margin style overridden by style prop', async () => {
    const modProps: ActionMenuProps = {
      ...actionMenuProps,
      margin: 'xs',
      style: {
        margin: 2,
      },
    };
    const { container } = render(TestActionMenu(modProps));
    await waitFor(() => {
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
    });
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
        setTimeout(resolve, 10);
      });
    });

    await waitFor(() => {
      expect(baseElement).toMatchSnapshot();
    });

    await act(async () => {
      fireEvent.keyPress(baseElement, {
        key: 'ArrowDown',
      });

      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
    });

    await waitFor(() => {
      expect(baseElement).toMatchSnapshot();
    });
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
