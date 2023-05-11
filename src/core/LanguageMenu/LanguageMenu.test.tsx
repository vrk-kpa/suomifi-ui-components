import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { axeTest } from '../../utils/test';
import { LanguageMenu, LanguageMenuProps } from './LanguageMenu';
import { LanguageMenuItem } from './LanguageMenuItem/LanguageMenuItem';

const doNothing = () => ({});

const languageMenuProps: LanguageMenuProps = {
  buttonText: 'In English (EN)',
  className: 'lm-test',
  id: 'test-id',
  wrapperProps: {
    id: 'wrapper-id',
    'data-testid': 'language-menu-test-id',
  },
};

const TestLanguageMenu = (props: LanguageMenuProps) => (
  <LanguageMenu {...props}>
    <LanguageMenuItem onClick={() => doNothing()} lang="fi">
      Suomeksi (FI)
    </LanguageMenuItem>
    <LanguageMenuItem href="/sv" lang="sv">
      På svenska (SV)
    </LanguageMenuItem>
    <LanguageMenuItem href="/en" lang="en" selected>
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
