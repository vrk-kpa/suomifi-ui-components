import React from 'react';
import { axeTest } from '../../utils/test/axe';

import { LanguageMenu } from './LanguageMenu';
import { LanguageMenuItem, LanguageMenuLink } from './LanguageMenuItem';

const doNothing = () => ({});

const TestMenuLanguage = (
  <LanguageMenu.language className="menu-language-test" name="FI">
    <LanguageMenuItem.language onSelect={doNothing} selected={true}>
      Suomeksi (FI)
    </LanguageMenuItem.language>
    <LanguageMenuLink.language href="/sv">
      På svenska (SV)
    </LanguageMenuLink.language>
  </LanguageMenu.language>
);

test('should not have basic accessibility issues', axeTest(TestMenuLanguage));
