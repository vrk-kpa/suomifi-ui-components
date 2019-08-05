import React from 'react';
import { axeTest } from '../../utils/test/axe';
import { cssFromBaseStyles } from '../utils';

import { Menu } from './Menu';
import { MenuItem, MenuLink } from './MenuItem';
import { baseStyles } from './Menu.baseStyles';

const doNothing = () => ({});

const TestMenuLanguage = (
  <Menu.language className="menu-language-test" name="FI">
    <MenuItem.language onSelect={doNothing} selected={true}>
      Suomeksi (FI)
    </MenuItem.language>
    <MenuLink.language href="/sv">På svenska (SV)</MenuLink.language>
  </Menu.language>
);

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('data-reach-menu-button'));
});

test('should not have basic accessibility issues', axeTest(TestMenuLanguage));
