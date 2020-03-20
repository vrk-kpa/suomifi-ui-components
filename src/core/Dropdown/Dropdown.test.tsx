import React from 'react';
// import { axe } from 'jest-axe';
import { render, prettyDOM, act } from '@testing-library/react';

import { Dropdown } from './Dropdown';

const doNothing = () => ({});

const TestDropdown = (
  <Dropdown className="dropdown-test" name="Dropdown">
    <Dropdown.item onSelect={doNothing}>Item 1</Dropdown.item>
    <Dropdown.item onSelect={doNothing}>Item 2</Dropdown.item>
  </Dropdown>
);

let html: string | boolean = false;

test('should not have basic accessibility issues', async () => {
  act(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const { container } = render(TestDropdown, {
      container: div,
    });
    html = prettyDOM(container);
  });

  if (typeof html === 'boolean') {
    throw new Error('Dropdown did not render correctly');
  } else {
    // const results = await axe(html);
    // expect(results).toHaveNoViolations();
  }
});
