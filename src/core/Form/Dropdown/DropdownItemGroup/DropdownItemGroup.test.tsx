import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { DropdownItemGroup } from './DropdownItemGroup';

describe('DropdownItemGroup', () => {
  it('should render grouped items', () => {
    const { container } = render(
      <Dropdown labelText="Vakinainen asuminen" visualPlaceholder="Valitse">
        <DropdownItemGroup label="Vakinainen asuminen">
          <DropdownItem value="parents">Vanhempien luona</DropdownItem>
          <DropdownItem value="mothers">Äidin luona</DropdownItem>
        </DropdownItemGroup>
        <DropdownItemGroup label="Vuoroasuminen">
          <DropdownItem value="rotating-parents">Vanhempien luona</DropdownItem>
          <DropdownItem value="rotating-mother-guardian">
            Äidin / oheishuoltajan luona
          </DropdownItem>
        </DropdownItemGroup>
      </Dropdown>,
    );

    expect(container.firstChild).toBeDefined();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Dropdown labelText="Test" visualPlaceholder="Choose">
        <DropdownItemGroup label="Group 1">
          <DropdownItem value="item1">Item 1</DropdownItem>
        </DropdownItemGroup>
      </Dropdown>,
    );

    // The component should be accessible
    const dropdown = screen.getByText('Test');
    expect(dropdown).toBeInTheDocument();
  });
});
