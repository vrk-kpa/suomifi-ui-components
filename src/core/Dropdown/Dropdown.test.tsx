import React from 'react';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Dropdown.baseStyles';
import { axeTest } from '../../utils/test/axe';

import { Dropdown } from './Dropdown';

const doNothing = () => ({});

const TestDropdown = (
  <Dropdown className="dropdown-test" name="Dropdown">
    <Dropdown.item onSelect={doNothing}>Item 1</Dropdown.item>
    <Dropdown.item onSelect={doNothing}>Item 2</Dropdown.item>
  </Dropdown>
);

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('position'));
});

test('should not have basic accessibility issues', axeTest(TestDropdown));
