import React from 'react';
import { axeTest } from '../../utils/test/axe';

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

test('should not have basic accessibility issues', axeTest(TestMenuLanguage));
