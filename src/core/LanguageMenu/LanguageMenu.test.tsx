import React from 'react';
import { render } from '@testing-library/react';

import { LanguageMenu } from './LanguageMenu';
import { LanguageMenuItem } from './LanguageMenuItem';
import { LanguageMenuLink } from './LanguageMenuLink';
import { axeTest } from '../../utils/test/axe';

const doNothing = () => ({});

const TestMenuLanguage = (
  <LanguageMenu className="menu-language-test" name="FI">
    <LanguageMenuItem onSelect={doNothing} selected={true}>
      Suomeksi (FI)
    </LanguageMenuItem>
    <LanguageMenuLink href="/sv">På svenska (SV)</LanguageMenuLink>
  </LanguageMenu>
);

test('calling render with the same component on the same container does not remount', () => {
  const { container } = render(TestMenuLanguage);
  expect(container).toMatchSnapshot();
});

// Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
test(
  'should not have basic accessibility issues',
  axeTest(TestMenuLanguage, {
    rules: {
      'aria-valid-attr-value': {
        enabled: false,
      },
    },
  }),
);
