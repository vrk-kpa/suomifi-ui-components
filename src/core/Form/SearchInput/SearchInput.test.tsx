import React, { act } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { SearchInput, SearchInputProps } from './SearchInput';

const TestSearchInput = (props: Partial<SearchInputProps> = {}) => {
  const {
    labelText = 'Test search input',
    clearButtonLabel = 'Clear',
    searchButtonLabel = 'Search',
    autosuggest = false,
    suggestions = [],
    suggestionHintText = '',
    ariaOptionsAvailableText = '',
    onSuggestionSelected = jest.fn(),
    ...passProps
  } = props;
  return (
    <SearchInput
      data-testid="searchinput"
      labelText={labelText}
      clearButtonLabel={clearButtonLabel}
      searchButtonLabel={searchButtonLabel}
      autosuggest={autosuggest}
      suggestions={suggestions}
      suggestionHintText={suggestionHintText}
      ariaOptionsAvailableText={ariaOptionsAvailableText}
      onSuggestionSelected={onSuggestionSelected}
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
      expect(label).toHaveClass('fi-label_label-span');
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

  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(
        <SearchInput
          labelText=""
          clearButtonLabel=""
          searchButtonLabel=""
          margin="xs"
        />,
      );
      expect(container.firstChild).toHaveStyle('margin: 10px');
    });

    it('should have margin prop overwritten by style prop', () => {
      const { container } = render(
        <SearchInput
          labelText=""
          clearButtonLabel=""
          searchButtonLabel=""
          margin="xs"
          style={{ margin: 2 }}
        />,
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
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

  describe('ref', () => {
    it('ref is forwarded to input', () => {
      const ref = React.createRef<HTMLInputElement>();

      render(
        <SearchInput
          labelText="Debounced search"
          clearButtonLabel="clear"
          searchButtonLabel="search"
          ref={ref}
        />,
      );

      expect(ref.current?.tagName).toBe('INPUT');
    });
  });
});

describe('autosuggest', () => {
  const suggestions = [
    { uniqueId: '1', label: 'app' },
    { uniqueId: '2', label: 'banana' },
    { uniqueId: '3', label: 'cherry' },
  ];

  it('should display suggestions based on input value', async () => {
    const { getByRole, getByText, getAllByRole } = render(
      TestSearchInput({
        autosuggest: true,
        suggestions,
      }),
    );

    const inputElement = getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'app' } });

    const items = await waitFor(() => getAllByRole('option'));
    expect(items).toHaveLength(3);

    expect(getByText('app')).toBeInTheDocument();
    expect(getByText('banana')).toBeInTheDocument();
    expect(getByText('cherry')).toBeInTheDocument();
  });

  it('should call onSuggestionSelect when a suggestion is clicked', async () => {
    const mockOnSuggestionSelect = jest.fn();
    const { getByRole, getByText, getAllByRole } = render(
      TestSearchInput({
        autosuggest: true,
        suggestions,
        onSuggestionSelected: mockOnSuggestionSelect,
      }),
    );

    const inputElement = getByRole('searchbox') as HTMLInputElement;

    const options = await waitFor(() => getAllByRole('option'));
    expect(options).toHaveLength(3);

    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'app' } });
    });

    const suggestion = getByText('app');
    fireEvent.click(suggestion);

    expect(mockOnSuggestionSelect).toBeCalledWith('1');
  });

  it('should allow keyboard navigation through suggestions', async () => {
    const { getByRole, getAllByRole } = render(
      TestSearchInput({
        autosuggest: true,
        suggestions,
      }),
    );

    const inputElement = getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'a' } });

    const items = await waitFor(() => getAllByRole('option'));
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    expect(items[0]).toHaveClass('fi-select-item--hasKeyboardFocus');

    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    expect(items[1]).toHaveClass('fi-select-item--hasKeyboardFocus');
    expect(items[0]).not.toHaveClass('fi-select-item--hasKeyboardFocus');

    fireEvent.keyDown(inputElement, { key: 'ArrowUp' });
    expect(items[0]).toHaveClass('fi-select-item--hasKeyboardFocus');
  });

  it('should close suggestions on Escape key press', async () => {
    const { getByRole, queryAllByRole } = render(
      TestSearchInput({
        autosuggest: true,
        suggestions,
      }),
    );

    const inputElement = getByRole('searchbox') as HTMLInputElement;

    const items = await waitFor(() => queryAllByRole('option'));
    expect(items).toHaveLength(3);

    fireEvent.keyDown(inputElement, { key: 'Escape' });
    expect(queryAllByRole('option')).toHaveLength(0);
  });

  it('should retain focus on input after Escape key press', async () => {
    const { getByRole } = render(
      TestSearchInput({
        autosuggest: true,
        suggestions,
      }),
    );

    const inputElement = getByRole('searchbox') as HTMLInputElement;

    fireEvent.keyDown(inputElement, { key: 'Escape' });

    await waitFor(() => {
      expect(inputElement).toHaveFocus();
    });
  });

  it('should update suggestions dynamically', async () => {
    const updatedSuggestions = [
      { uniqueId: '3', label: 'cherry' },
      { uniqueId: '4', label: 'date' },
    ];
    const { getByRole, getAllByRole, rerender } = render(
      TestSearchInput({
        autosuggest: true,
        suggestions,
      }),
    );

    const inputElement = getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'a' } });

    let items = await waitFor(() => getAllByRole('option'));
    expect(items).toHaveLength(3);

    rerender(
      TestSearchInput({
        autosuggest: true,
        suggestions: updatedSuggestions,
      }),
    );

    items = await waitFor(() => getAllByRole('option'));
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('cherry');
    expect(items[1]).toHaveTextContent('date');
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
