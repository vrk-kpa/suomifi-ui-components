import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { SearchInput, SearchInputProps } from './SearchInput';

const TestSearchInput = (
  props: Partial<SearchInputProps> = {
    id: 'test-id',
  },
) => {
  const {
    labelText,
    clearButtonLabel,
    searchButtonLabel,
    ...passProps
  } = props;
  return (
    <SearchInput
      data-testid="searchinput"
      labelText={labelText || 'Test search input'}
      clearButtonLabel={clearButtonLabel || 'Clear'}
      searchButtonLabel={searchButtonLabel || 'Search'}
      {...passProps}
    />
  );
};

describe('snapshot', () => {
  it('should have matching default structure', () => {
    const searchInputRendered = render(TestSearchInput());
    const { container } = searchInputRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('props', () => {
  describe('default structure, with default props', () => {
    it('should have baseClassName', () => {
      const { container } = render(TestSearchInput());
      expect(container.firstChild).toHaveClass('fi-search-input');
    });

    it('should have <input type="text"> HTML-element with correct class ', () => {
      const { getByRole } = render(TestSearchInput());
      const inputElement = getByRole('searchbox');
      expect(inputElement).toHaveClass('fi-search-input_input');
    });

    it('should have label text with correct class', () => {
      const { getByText } = render(TestSearchInput());
      const label = getByText('Test search input').closest('div');
      expect(label).toHaveClass('fi-label-text');
    });

    it(
      'should not have basic accessibility issues',
      axeTest(TestSearchInput()),
    );
  });

  describe('className', () => {
    it('should have the given custom classname ', () => {
      const { container } = render(
        TestSearchInput({ className: 'custom-classname' }),
      );
      expect(container.firstChild).toHaveClass('custom-classname');
    });
  });

  describe('onBlur', () => {
    test('should notice when leaving area', () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(TestSearchInput({ onBlur: mockOnBlur }));
      const inputElement = getByRole('searchbox');
      fireEvent.blur(inputElement);
      expect(mockOnBlur).toBeCalledTimes(1);
    });
  });

  describe('onChange', () => {
    it('should notice change and have the given text', () => {
      const mockOnChange = jest.fn();
      const { getByRole } = render(TestSearchInput({ onChange: mockOnChange }));
      const inputElement = getByRole('searchbox') as HTMLTextAreaElement;
      fireEvent.change(inputElement, { target: { value: 'abc' } });
      expect(mockOnChange).toBeCalledTimes(1);
      expect(inputElement.value).toBe('abc');
    });
  });

  describe('onSearch', () => {
    it('should trigger onSearch callback', () => {
      const mockOnSearch = jest.fn();
      const { getAllByRole } = render(
        TestSearchInput({
          onSearch: mockOnSearch,
          defaultValue: 'Some test value',
        }),
      );
      const searchButton = getAllByRole('button')[1];
      fireEvent.click(searchButton);
      expect(mockOnSearch).toBeCalledTimes(1);
    });
  });

  describe('onClear', () => {
    it('should trigger onChange and clear input value', () => {
      const mockOnChange = jest.fn();
      const { getAllByRole } = render(
        TestSearchInput({
          onChange: mockOnChange,
          defaultValue: 'Some test value',
        }),
      );
      const clearButton = getAllByRole('button')[0];
      fireEvent.click(clearButton);
      expect(mockOnChange).toBeCalledTimes(1);
      const inputElement = getAllByRole('searchbox')[0] as HTMLInputElement;
      expect(inputElement.value).toBe('');
    });
  });

  describe('labelMode', () => {
    it('hidden: should hide visually-hidden classname   ', () => {
      const { getByText } = render(
        TestSearchInput({
          labelMode: 'hidden',
          labelText: 'To be hidden',
        }),
      );
      const label = getByText('To be hidden');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('visualPlaceholder', () => {
    it('should have the given text as attribute', () => {
      const { getByRole } = render(
        TestSearchInput({
          visualPlaceholder: 'Search...',
        }),
      );
      const inputElement = getByRole('searchbox') as HTMLInputElement;
      expect(inputElement).toHaveAttribute('placeholder', 'Search...');
    });
  });

  describe('statusText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        TestSearchInput({ statusText: 'EROR EROR' }),
      );
      const statusText = getByText('EROR EROR');
      expect(statusText).toHaveClass('fi-status-text');
    });
  });

  describe('status', () => {
    it('should have error classname', () => {
      const { container } = render(
        TestSearchInput({ status: 'error', statusText: 'EROR EROR' }),
      );
      expect(container.firstChild).toHaveClass('fi-search-input--error');
    });
  });

  describe('name', () => {
    it('has the given name attribute', () => {
      const { getByRole } = render(TestSearchInput({ name: 'test-name' }));
      const inputElement = getByRole('searchbox') as HTMLInputElement;
      expect(inputElement.name).toBe('test-name');
    });
  });
});
