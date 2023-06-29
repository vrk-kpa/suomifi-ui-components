import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { axeTest } from '../../utils/test';
import { LanguageMenu, LanguageMenuProps } from './LanguageMenu';
import { LanguageMenuItem } from './LanguageMenuItem/LanguageMenuItem';

const languageMenuProps: LanguageMenuProps = {
  'aria-label': 'Select language',
  buttonText: 'In English (EN)',
  className: 'lm-test',
  id: 'test-id',
  wrapperProps: {
    id: 'wrapper-id',
    'data-testid': 'language-menu-test-id',
  },
};

const compulsoryProps: LanguageMenuProps = {
  'aria-label': 'Select language',
  buttonText: 'In English (EN)',
};

const TestLanguageMenu = (props: LanguageMenuProps) => (
  <LanguageMenu {...props}>
    <LanguageMenuItem onSelect={() => ({})} lang="fi">
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
  const BasicLanguageMenu = TestLanguageMenu(languageMenuProps);

  it('should have provided ids', async () => {
    const { findByRole, findByTestId } = render(BasicLanguageMenu);
    const wrapperDiv = await findByTestId('language-menu-test-id');
    expect(wrapperDiv).toBeTruthy();
    expect(wrapperDiv).toHaveAttribute('id', 'wrapper-id');
    const button = await findByRole('button');
    expect(button).toHaveAttribute('id', 'test-id');
  });

  it('should have button text', async () => {
    const { findByRole } = render(BasicLanguageMenu);
    const button = await findByRole('button');
    expect(button).toHaveTextContent('In English (EN)');
  });

  it('should match snapshot', async () => {
    const { baseElement, getByRole } = render(BasicLanguageMenu);
    const menuButton = getByRole('button') as HTMLButtonElement;
    expect(baseElement).toMatchSnapshot();
    await act(async () => {
      fireEvent.click(menuButton);
    });
    expect(baseElement).toMatchSnapshot();
  });
});

describe('movement in LanguageMenu', () => {
  const BasicLanguageMenu = TestLanguageMenu(languageMenuProps);

  it('should match snapshot', async () => {
    const { baseElement, getByRole } = render(BasicLanguageMenu);
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

describe('callbacks', () => {
  describe('onOpen', () => {
    it('should call onOpen when menu button is clicked', () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onOpen: mockOnOpen }),
      );
      fireEvent.click(getByRole('button'));
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with Enter in menu button', () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onOpen: mockOnOpen }),
      );
      fireEvent.keyDown(getByRole('button'), { key: 'Enter' });
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with Space in menu button', () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onOpen: mockOnOpen }),
      );
      fireEvent.keyDown(getByRole('button'), { key: ' ' });
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with ArrowUp in menu button', () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onOpen: mockOnOpen }),
      );
      fireEvent.keyDown(getByRole('button'), { key: 'ArrowUp' });
      expect(mockOnOpen).toBeCalledTimes(1);
    });

    it('should call onOpen with ArrowDown in menu button', () => {
      const mockOnOpen = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onOpen: mockOnOpen }),
      );
      fireEvent.keyDown(getByRole('button'), { key: 'ArrowDown' });
      expect(mockOnOpen).toBeCalledTimes(1);
    });
  });

  describe('onClose', () => {
    it('should call onClose with Escape', () => {
      const mockOnClose = jest.fn();
      const { baseElement, getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onClose: mockOnClose }),
      );
      fireEvent.click(getByRole('button'));
      const item = baseElement.querySelectorAll('[role="menuitem"]')[0];
      fireEvent.click(item);
      fireEvent.keyDown(item, { key: 'Escape' });
      expect(mockOnClose).toBeCalledTimes(1);
    });

    it('should call onClose with click outside menu', async () => {
      const mockOnClose = jest.fn();
      const { baseElement, getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onClose: mockOnClose }),
      );
      fireEvent.click(getByRole('button'));
      expect(baseElement.querySelector('[role="menu"]')).toBeVisible();
      fireEvent.click(getByRole('button'));
      expect(mockOnClose).toBeCalledTimes(1);
    });
  });

  describe('onBlur', () => {
    it('should call onBlur when focus moves to menu', () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(
        TestLanguageMenu({ ...compulsoryProps, onBlur: mockOnBlur }),
      );
      fireEvent.blur(getByRole('button'));
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
