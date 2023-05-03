import React from 'react';
import { render } from '@testing-library/react';

import { axeTest } from '../../utils/test';
import { LanguageMenu } from './LanguageMenu';
import { LanguageMenuItem } from './LanguageMenuItem/LanguageMenuItem';

const doNothing = () => ({});

const TestLanguageMenu = (
  <LanguageMenu
    className="language-menu-language-test"
    buttonText="Suomeksi (FI)"
  >
    <LanguageMenuItem onClick={() => doNothing()} selected>
      Suomeksi (FI)
    </LanguageMenuItem>
    <LanguageMenuItem href="/sv">På svenska (SV)</LanguageMenuItem>
    <LanguageMenuItem href="/en">In English (EN)</LanguageMenuItem>
  </LanguageMenu>
);

test('should match snapshot', () => {
  const { baseElement } = render(TestLanguageMenu);
  expect(baseElement).toMatchSnapshot();
});

// Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
test(
  'should not have basic accessibility issues',
  axeTest(TestLanguageMenu, {
    rules: {
      'aria-valid-attr-value': {
        enabled: false,
      },
    },
  }),
);
