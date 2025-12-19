/* eslint-disable no-promise-executor-return */
import React, { act } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axeTest } from '../../utils/test';
import { LanguageMenu, LanguageMenuProps } from './LanguageMenu';
import { LanguageMenuItem } from './LanguageMenuItem/LanguageMenuItem';
import { HTMLAttributesIncludingDataAttributes } from 'utils/common/common';

const waitForPosition = async () => {
  await act(() => new Promise((r) => requestAnimationFrame(() => r(null))));
  await act(() => new Promise((r) => requestAnimationFrame(() => r(null))));
};

type MenuProps = LanguageMenuProps &
  HTMLAttributesIncludingDataAttributes<HTMLButtonElement>;

const languageMenuProps: MenuProps = {
  'aria-label': 'Select language',
  buttonText: 'In English (EN)',
};

const mockOnSelect = jest.fn();

const TestLanguageMenu = (props: MenuProps) => (
  <LanguageMenu {...props}>
    <LanguageMenuItem onSelect={mockOnSelect} lang="fi">
      Suomeksi (FI)
    </LanguageMenuItem>
    <LanguageMenuItem onSelect={() => ({})} lang="sv">
      På svenska (SV)
    </LanguageMenuItem>
    <LanguageMenuItem onSelect={() => ({})} lang="en" selected>
      In English (EN)
    </LanguageMenuItem>
  </LanguageMenu>
);

describe('Basic LanguageMenu', () => {
  it('should match snapshot when closed', () => {
    const { baseElement } = render(TestLanguageMenu(languageMenuProps));
    expect(baseElement).toMatchSnapshot();
  });

  it('should match snapshot when opened', async () => {
    const user = userEvent.setup();
    const { baseElement, getByRole } = render(
      TestLanguageMenu(languageMenuProps),
    );
    const menuButton = getByRole('button');
    await user.click(menuButton);
    await waitForPosition();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('LanguageMenuItem', () => {
  describe('onSelect', () => {
    it('should call onSelect when clicked', async () => {
      const user = userEvent.setup();
      const { getByRole, getAllByRole } = render(
        TestLanguageMenu(languageMenuProps),
      );
      await user.click(getByRole('button'));
      await waitForPosition();
      const item = getAllByRole('menuitem')[0];
      await user.click(item);
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });
  });
});

describe('props', () => {
  describe('buttonText', () => {
    it('should have buttonText', () => {
      const { getByRole } = render(TestLanguageMenu(languageMenuProps));
      const button = getByRole('button');
      expect(button).toHaveTextContent('In English (EN)');
    });
  });

  describe('id', () => {
    it('should have id', () => {
      const { getByRole } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          id: 'test-id',
        }),
      );
      const button = getByRole('button');
      expect(button).toHaveAttribute('id', 'test-id');
    });
  });

  describe('data-testid', () => {
    it('should have data-testid', () => {
      const { getByRole } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          'data-testid': 'custom-data-attribute',
        }),
      );
      const button = getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'custom-data-attribute');
    });
  });

  describe('className', () => {
    it('shoud have base className and given className in wrapper element', () => {
      const { container } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          className: 'lm-test',
        }),
      );
      expect(container.firstChild).toHaveClass('fi-language-menu');
      expect(container.firstChild).toHaveClass('lm-test');
    });
  });

  describe('menuClassName', () => {
    it('shoud have className in popover wrapper element', () => {
      const { baseElement } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          menuClassName: 'menu-custom-class',
        }),
      );
      const div = baseElement.querySelector('.fi-language-menu-popover');
      expect(div).toHaveClass('menu-custom-class');
    });
  });

  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          margin: 'xs',
        }),
      );
      expect(container.firstChild).toHaveStyle('margin: 10px');
    });

    it('should have margin prop overwritten by style prop', () => {
      const { container } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          margin: 'xs',
          style: { margin: 2 },
        }),
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
    });
  });
});

describe('callbacks', () => {
  describe('onOpen', () => {
    it('should call onOpen when menu button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      await user.click(getByRole('button'));
      await waitForPosition();
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with Enter in menu button', async () => {
      const user = userEvent.setup();
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      const button = getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      await waitForPosition();
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with Space in menu button', async () => {
      const user = userEvent.setup();
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      const button = getByRole('button');
      button.focus();
      await user.keyboard(' ');
      await waitForPosition();
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with ArrowUp in menu button', async () => {
      const user = userEvent.setup();
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      const button = getByRole('button');
      button.focus();
      await user.keyboard('{ArrowUp}');
      await waitForPosition();
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with ArrowDown in menu button', async () => {
      const user = userEvent.setup();
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      const button = getByRole('button');
      button.focus();
      await user.keyboard('{ArrowDown}');
      await waitForPosition();
      expect(mockOnOpen).toBeCalledTimes(1);
    });
  });

  describe('onClose', () => {
    it('should call onClose with Escape', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();
      const { getByRole, getAllByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onClose: mockOnClose }),
      );
      await user.click(getByRole('button'));
      await waitForPosition();
      const item = getAllByRole('menuitem')[0];
      await user.click(item);
      await user.keyboard('{Escape}');
      expect(mockOnClose).toBeCalledTimes(1);
    });

    it('should call onClose with click outside menu', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onClose: mockOnClose }),
      );
      await user.click(getByRole('button'));
      await waitForPosition();
      await waitFor(() => expect(getByRole('menu')).toBeVisible());
      await user.click(getByRole('button'));
      expect(mockOnClose).toBeCalledTimes(1);
    });
  });

  describe('onBlur', () => {
    it('should call onBlur when focus moves to menu', async () => {
      const user = userEvent.setup();
      const mockOnBlur = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onBlur: mockOnBlur }),
      );
      const button = getByRole('button');
      button.focus();
      await user.tab();
      expect(mockOnBlur).toBeCalledTimes(1);
    });
  });
});

// Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
test(
  'should not have basic accessibility issues',
  axeTest(TestLanguageMenu(languageMenuProps), {
    rules: {
      'aria-valid-attr-value': {
        enabled: false,
      },
    },
  }),
);
