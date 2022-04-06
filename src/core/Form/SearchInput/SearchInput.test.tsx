import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { SearchInput, SearchInputProps } from './SearchInput';

const TestSearchInput = (props: Partial<SearchInputProps> = {}) => {
  const { labelText, clearButtonLabel, searchButtonLabel, ...passProps } =
    props;
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

    it('should have <input type="search"> HTML-element with correct class ', () => {
      const { getByRole } = render(TestSearchInput());
      const inputElement = getByRole('searchbox');
      expect(inputElement).toHaveClass('fi-search-input_input');
      expect(inputElement).toHaveAttribute('type', 'search');
    });

    it('should have label text with correct class and for id', () => {
      const { getByText } = render(TestSearchInput({ id: 'test-id' }));
      const label = getByText('Test search input').closest('label');
      expect(label?.parentElement).toHaveClass('fi-label-text');
      expect(label).toHaveAttribute('for', 'test-id');
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

  describe('aria', () => {
    it('input should have provided aria-describedby and attribute referencing status text', () => {
      const { getByRole } = render(
        TestSearchInput({
          id: 'test-id-aria',
          'aria-describedby': 'describedby-id',
          statusText: 'Test status text',
        }),
      );
      const inputElement = getByRole('searchbox') as HTMLInputElement;
      expect(inputElement).toHaveAttribute(
        'aria-describedby',
        'test-id-aria-statusText describedby-id',
      );
    });

    it('icons should have aria-hidden attribute set to true', () => {
      const { container } = render(TestSearchInput());
      const svgList = container.getElementsByTagName('svg');
      for (let i = 0; i < svgList.length; i += 1) {
        expect(svgList[i]).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });
  describe('debounce', () => {
    it('delays the running of onChange by the given time', () => {
      jest.useFakeTimers();
      const mockOnChange = jest.fn();
      const searchInput = (
        <SearchInput
          labelText="Debounced search"
          clearButtonLabel="clear"
          searchButtonLabel="search"
          debounce={1000}
          onChange={mockOnChange}
        />
      );
      const { getByRole } = render(searchInput);

      const inputElement = getByRole('searchbox') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'new value' } });
      expect(mockOnChange).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(mockOnChange).toBeCalledTimes(1);
      expect(inputElement.value).toBe('new value');
    });
  });
});

describe('states', () => {
  describe('empty input', () => {
    it('should not have accessible buttons', () => {
      const { queryAllByRole } = render(TestSearchInput({ defaultValue: '' }));
      const buttons = queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });

    it('should not react to enter before adding text to input', () => {
      const mockOnSearch = jest.fn();
      const { getByRole, getAllByRole } = render(
        TestSearchInput({
          onSearch: mockOnSearch,
          defaultValue: '',
        }),
      );
      const inputElement = getByRole('searchbox') as HTMLTextAreaElement;
      fireEvent.keyPress(inputElement, {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(mockOnSearch).toBeCalledTimes(0);
      fireEvent.change(inputElement, { target: { value: 'abc' } });
      fireEvent.keyPress(inputElement, {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(mockOnSearch).toBeCalledTimes(1);
      const searchButton = getAllByRole('button')[1];
      fireEvent.click(searchButton);
      expect(mockOnSearch).toBeCalledTimes(2);
    });
  });
});
