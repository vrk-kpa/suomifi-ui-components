import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test';
import { FilterInput } from './FilterInput';

interface Product {
  name: string;
  price: number;
  tax: boolean;
}

const TestFilterInput = (
  <FilterInput
    labelText="Label"
    items={[]}
    onFilter={jest.fn()}
    filterFunc={() => true}
  />
);

test('should not have basic accessibility issues', async () =>
  axeTest(TestFilterInput));

test('snapshot matches', () => {
  const { container } = render(TestFilterInput);
  expect(container.firstChild).toMatchSnapshot();
});

describe('props', () => {
  const mockOnFilter = jest.fn();
  const mockFilterFunc = jest.fn(() => true);

  describe('className', () => {
    it('has the given custom className', () => {
      const { container } = render(
        <FilterInput
          className="custom-style"
          labelText="Label"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('status', () => {
    it('has the className when in error state', () => {
      const { container } = render(
        <FilterInput
          className="custom-style"
          labelText="Label"
          status="error"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      expect(container.firstChild).toHaveClass('fi-filter-input--error');
    });
  });

  describe('statusText', () => {
    it('has the status text element', () => {
      const { getByText } = render(
        <FilterInput
          statusText="Example status text"
          labelText="Label"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
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
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-statusText',
      );
    });
  });

  describe('disabled', () => {
    it('has disabled attribute and classname', () => {
      const { container, getByRole } = render(
        <FilterInput
          disabled={true}
          labelText="Label"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      expect(container.firstChild).toHaveClass('fi-filter-input--disabled');

      const inputField = getByRole('textbox') as HTMLInputElement;
      expect(inputField).toHaveAttribute('disabled');
    });
  });

  describe('labelAlign', () => {
    it('has the className for left align', () => {
      const { container } = render(
        <FilterInput
          labelAlign="left"
          labelText="Label"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      expect(container.firstChild).toHaveClass(
        'fi-filter-input--label-align-left',
      );
    });
  });

  describe('labelText', () => {
    it('should be found ', () => {
      const { getByText } = render(
        <FilterInput
          labelText="Label"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      const label = getByText('Label');
      expect(label).toHaveClass('fi-label_label-span');
    });
  });

  describe('optionalText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <FilterInput
          labelText="Label"
          optionalText="Optional"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      const optionalText = getByText('(Optional)');
      expect(optionalText).toHaveClass('fi-label_optional-text');
    });
  });

  describe('labelMode', () => {
    it('should be visible by default', () => {
      const { getByText } = render(
        <FilterInput
          labelText="Label"
          optionalText="Optional"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      const label = getByText('Label');
      expect(label).toHaveClass('fi-label_label-span');
    });

    it('should be hidden', () => {
      const { getByText } = render(
        <FilterInput
          labelText="Label"
          labelMode="hidden"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      const label = getByText('Label');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('visualPlaceholder', () => {
    it('should have the given text', () => {
      const { getByRole } = render(
        <FilterInput
          labelText="Label"
          visualPlaceholder="Enter text here"
          items={[]}
          onFilter={mockOnFilter}
          filterFunc={mockFilterFunc}
        />,
      );
      const inputField = getByRole('textbox') as HTMLInputElement;
      expect(inputField).toHaveAttribute('placeholder', 'Enter text here');
    });
  });

  describe('onFilter', () => {
    const tools: Product[] = [
      { name: 'Jackhammer', price: 230, tax: false },
      { name: 'Hammer', price: 15, tax: true },
      { name: 'Sledgehammer', price: 36, tax: false },
      { name: 'Spade', price: 50, tax: true },
      { name: 'Powersaw', price: 150, tax: false },
    ];

    it('should return filtered items', () => {
      const mockedOnFilter = jest.fn((filtered) => filtered);
      const filter = (tool: Product, query: string) =>
        tool.name.includes(query);
      const { getByRole } = render(
        <FilterInput
          labelText="Label"
          visualPlaceholder="Enter text here"
          items={tools}
          onFilter={mockedOnFilter}
          filterFunc={filter}
          shouldFilter={true}
        />,
      );
      const inputField = getByRole('textbox') as HTMLInputElement;
      fireEvent.change(inputField, { target: { value: 'hammer' } });
      expect(mockedOnFilter.mock.results).toEqual([
        {
          type: 'return',
          value: [
            { name: 'Jackhammer', price: 230, tax: false },
            { name: 'Sledgehammer', price: 36, tax: false },
          ],
        },
      ]);
    });
  });
});
