import React from 'react';
import { axeTest } from '../../utils/test/axe';

import { Menu } from './Menu';
import { MenuItem, MenuLink } from './MenuItem';

const doNothing = () => ({});

const TestMenuLanguage = (
  <Menu.language className="menu-language-test" name="FI">
    <MenuItem.language onSelect={doNothing} selected={true}>
      Suomeksi (FI)
    </MenuItem.language>
    <MenuLink.language href="/sv">På svenska (SV)</MenuLink.language>
  </Menu.language>
);

test('should not have basic accessibility issues', axeTest(TestMenuLanguage));
