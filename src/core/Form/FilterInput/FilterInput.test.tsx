import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { FilterInput } from './FilterInput';

interface Product {
  name: string;
  price: number;
  tax: boolean;
}

const tools: Product[] = [
  { name: 'Jackhammer', price: 230, tax: false },
  { name: 'Hammer', price: 15, tax: true },
  { name: 'Sledgehammer', price: 36, tax: false },
  { name: 'Spade', price: 50, tax: true },
  { name: 'Powersaw', price: 150, tax: false },
];

const filter = (tool: Product, query: string) => tool.name.includes(query);

const TestFilterInput = (
  <FilterInput
    labelText="Label"
    items={tools}
    onFiltering={(filtered) => console.log(filtered)}
    filterRule={filter}
  />
);

test('should not have basic accessibility issues', async () =>
  axeTest(TestFilterInput));

test('snapshot matches', () => {
  const { container } = render(TestFilterInput);
  expect(container.firstChild).toMatchSnapshot();
});

describe('props', () => {
  describe('className', () => {
    it('has the given custom className', () => {
      const { container } = render(
        <FilterInput
          className="custom-style"
          labelText="Label"
          items={tools}
          onFiltering={(filtered) => console.log(filtered)}
          filterRule={filter}
        />,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('statusText', () => {
    it('has the status text element', () => {
      const { getByText } = render(
        <FilterInput
          statusText="Example status text"
          labelText="Label"
          items={tools}
          onFiltering={(filtered) => console.log(filtered)}
          filterRule={filter}
        />,
      );
      const statusText = getByText('Example status text');
      expect(statusText).toHaveClass('fi-status-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <FilterInput
          statusText="Example status text"
          id="123"
          labelText="Label"
          items={tools}
          onFiltering={(filtered) => console.log(filtered)}
          filterRule={filter}
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-statusText',
      );
    });
  });
});
