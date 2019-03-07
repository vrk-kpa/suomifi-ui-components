import React from 'react';
import { render, getByText } from 'react-testing-library';

import { Dropdown, DropdownItem } from './Dropdown';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Dropdown.baseStyles';

const doNothing = () => undefined;

test('calling render with the same component on the same container does not remount', () => {
  const dropdownRendered = render(
    <Dropdown data-testid="dropdown" name="dropdown">
      <DropdownItem onSelect={doNothing}>test 1</DropdownItem>
      <DropdownItem onSelect={doNothing}>test 2</DropdownItem>
    </Dropdown>,
  );
  const { container, rerender } = dropdownRendered;
  // expect(container.firstChild).toMatchSnapshot();
  expect(getByText(container, 'dropdown').textContent).toBe('dropdown');

  // re-render the same component with different props
  rerender(
    <Dropdown data-testid="dropdown" name="dropdown2">
      <DropdownItem onSelect={doNothing}>test 2</DropdownItem>
      <DropdownItem onSelect={doNothing}>test 1</DropdownItem>
    </Dropdown>,
  );
  expect(getByText(container, 'dropdown2').textContent).toBe('dropdown2');
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('position'));
});
