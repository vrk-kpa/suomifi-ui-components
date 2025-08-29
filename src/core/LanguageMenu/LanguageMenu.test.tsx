import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { axeTest } from '../../utils/test';
import { LanguageMenu, LanguageMenuProps } from './LanguageMenu';
import { LanguageMenuItem } from './LanguageMenuItem/LanguageMenuItem';
import { HTMLAttributesIncludingDataAttributes } from 'utils/common/common';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const waitForPosition = () => act(async () => {});

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
  it('should match snapshot when closed', async () => {
    const { baseElement } = render(TestLanguageMenu(languageMenuProps));
    await waitFor(async () => {
      expect(baseElement).toMatchSnapshot();
    });
  });

  it('should match snapshot when opened', async () => {
    const { baseElement, getByRole } = render(
      TestLanguageMenu(languageMenuProps),
    );
    await waitForPosition();
    const menuButton = getByRole('button');
    await act(async () => {
      fireEvent.click(menuButton);
    });
    await waitForPosition();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('LanguageMenuItem', () => {
  describe('onSelect', () => {
    it('should call onSelect when clicked', async () => {
      const { getByRole, getAllByRole } = render(
        TestLanguageMenu(languageMenuProps),
      );
      await waitForPosition();
      fireEvent.click(getByRole('button'));
      const item = getAllByRole('menuitem')[0];
      fireEvent.click(item);
      await waitFor(() => {
        expect(mockOnSelect).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe('props', () => {
  describe('buttonText', () => {
    it('should have buttonText', async () => {
      const { findByRole } = render(TestLanguageMenu(languageMenuProps));
      const button = await findByRole('button');
      expect(button).toHaveTextContent('In English (EN)');
    });
  });

  describe('id', () => {
    it('should have id', async () => {
      const { getByRole } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          id: 'test-id',
        }),
      );
      const button = getByRole('button');
      await waitFor(() => {
        expect(button).toHaveAttribute('id', 'test-id');
      });
    });
  });

  describe('data-testid', () => {
    it('should have data-testid', async () => {
      const { getByRole } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          'data-testid': 'custom-data-attribute',
        }),
      );
      const button = getByRole('button');
      await waitFor(() => {
        expect(button).toHaveAttribute('data-testid', 'custom-data-attribute');
      });
    });
  });

  describe('className', () => {
    it('shoud have base className and given className in wrapper element', async () => {
      const { container } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          className: 'lm-test',
        }),
      );
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('fi-language-menu');
        expect(container.firstChild).toHaveClass('lm-test');
      });
    });
  });

  describe('menuClassName', () => {
    it('shoud have className in popover wrapper element', async () => {
      const { baseElement } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          menuClassName: 'menu-custom-class',
        }),
      );
      const div = baseElement.querySelector('.fi-language-menu-popover');
      await waitFor(() => {
        expect(div).toHaveClass('menu-custom-class');
      });
    });
  });

  describe('margin', () => {
    it('should have margin style from margin prop', async () => {
      const { container } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          margin: 'xs',
        }),
      );
      await waitFor(() => {
        expect(container.firstChild).toHaveStyle('margin: 10px');
      });
    });

    it('should have margin prop overwritten by style prop', async () => {
      const { container } = render(
        TestLanguageMenu({
          ...languageMenuProps,
          margin: 'xs',
          style: { margin: 2 },
        }),
      );
      await waitFor(() => {
        expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
      });
    });
  });
});

describe('callbacks', () => {
  describe('onOpen', () => {
    it('should call onOpen when menu button is clicked', async () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      await waitForPosition();
      fireEvent.click(getByRole('button'));
      await waitFor(() => {
        expect(mockOnOpen).toBeCalledTimes(1);
      });
    });

    it('should call onOpen with Enter in menu button', async () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      await waitForPosition();
      fireEvent.keyDown(getByRole('button'), { key: 'Enter' });
      await waitFor(() => expect(mockOnOpen).toBeCalledTimes(1));
    });

    it('should call onOpen with Space in menu button', async () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      await waitForPosition();
      fireEvent.keyDown(getByRole('button'), { key: ' ' });
      await waitFor(() => expect(mockOnOpen).toBeCalledTimes(1));
    });

    it('should call onOpen with ArrowUp in menu button', async () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      await waitForPosition();
      fireEvent.keyDown(getByRole('button'), { key: 'ArrowUp' });
      await waitFor(() => expect(mockOnOpen).toBeCalledTimes(1));
    });

    it('should call onOpen with ArrowDown in menu button', async () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onOpen: mockOnOpen }),
      );
      await waitForPosition();
      fireEvent.keyDown(getByRole('button'), { key: 'ArrowDown' });
      await waitFor(() => expect(mockOnOpen).toBeCalledTimes(1));
    });
  });

  describe('onClose', () => {
    it('should call onClose with Escape', async () => {
      const mockOnClose = jest.fn();
      const { getByRole, getAllByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onClose: mockOnClose }),
      );
      await waitForPosition();
      fireEvent.click(getByRole('button'));
      const item = getAllByRole('menuitem')[0];
      fireEvent.click(item);
      fireEvent.keyDown(item, { key: 'Escape' });
      await waitFor(() => expect(mockOnClose).toBeCalledTimes(1));
    });

    it('should call onClose with click outside menu', async () => {
      const mockOnClose = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onClose: mockOnClose }),
      );
      await waitForPosition();
      fireEvent.click(getByRole('button'));
      await waitFor(() => expect(getByRole('menu')).toBeVisible());
      fireEvent.click(getByRole('button'));
      await waitFor(() => expect(mockOnClose).toBeCalledTimes(1));
    });
  });

  describe('onBlur', () => {
    it('should call onBlur when focus moves to menu', async () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...languageMenuProps, onBlur: mockOnBlur }),
      );
      fireEvent.blur(getByRole('button'));
      await waitFor(() => expect(mockOnBlur).toBeCalledTimes(1));
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
