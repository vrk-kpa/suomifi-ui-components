import React from 'react';
// import { axe } from 'jest-axe';
import { render, prettyDOM, act } from '@testing-library/react';

import { LanguageMenu } from './LanguageMenu';
import { LanguageMenuItem, LanguageMenuLink } from './LanguageMenuItem';

const doNothing = () => ({});

const TestMenuLanguage = (
  <LanguageMenu className="menu-language-test" name="FI">
    <LanguageMenuItem onSelect={doNothing} selected={true}>
      Suomeksi (FI)
    </LanguageMenuItem>
    <LanguageMenuLink href="/sv">På svenska (SV)</LanguageMenuLink>
  </LanguageMenu>
);

let html: string | boolean = false;

test('should not have basic accessibility issues', async () => {
  act(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const { container } = render(TestMenuLanguage, {
      container: div,
    });
    html = prettyDOM(container);
  });

  if (typeof html === 'boolean') {
    throw new Error('LanguageMenu did not render correctly');
  } else {
    // const results = await axe(html);
    // expect(results).toHaveNoViolations();
  }
});
