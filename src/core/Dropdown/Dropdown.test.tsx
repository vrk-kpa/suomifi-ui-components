import React from 'react';
import { axeTest } from '../../utils/test/axe';

import { Dropdown } from './Dropdown';

const doNothing = () => ({});

const TestDropdown = (
  <Dropdown className="dropdown-test" name="Dropdown">
    <Dropdown.item onSelect={doNothing}>Item 1</Dropdown.item>
    <Dropdown.item onSelect={doNothing}>Item 2</Dropdown.item>
  </Dropdown>
);

test('should not have basic accessibility issues', axeTest(TestDropdown));
