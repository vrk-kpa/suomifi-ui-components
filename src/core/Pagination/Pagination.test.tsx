import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../utils/test';
import { Pagination, PaginationProps } from './Pagination';

const TestPagination = (props: Partial<PaginationProps> = {}) => {
  const { currentPage, lastPage, onChange, ...passProps } = props;
  return (
    <Pagination
      data-testid="pagination"
      currentPage={currentPage || 1}
      lastPage={lastPage || 6}
      pageInput={true}
      smallScreen={false}
      invalidValueErrorText="is not allowed"
      ariaNextButtonLabel="Next page"
      ariaPreviousButtonLabel="Previous page"
      pageInputButtonText="Jump"
      inputPlaceholderText="placeholder text"
      onChange={
        onChange ||
        ((page) => {
          console.log('on change: ', page);
        })
      }
      textFunction={(current, last) => `Page ${current} / ${last}`}
      aria-label="my component here"
      {...passProps}
    />
  );
};

describe('snapshot', () => {
  it('should have matching default structure', () => {
    const paginationRendered = render(TestPagination());
    const { container } = paginationRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('props', () => {
  describe('default structure, with default props', () => {
    it('should have baseClassName', () => {
      const { container } = render(TestPagination());
      expect(container.firstChild).toHaveClass('fi-pagination');
    });

    /*
    it('should have <input type="search"> HTML-element with correct class ', () => {
      const { getByRole } = render(TestPagination());
      const inputElement = getByRole('searchbox');
      expect(inputElement).toHaveClass('fi-search-input_input');
      expect(inputElement).toHaveAttribute('type', 'search');
    });
   
    it('should have label text with correct class and for id', () => {
      const { getByText } = render(TestPagination({ id: 'test-id' }));
      const label = getByText('Test search input').closest('label');
      expect(label).toHaveClass('fi-label_label-span');
      expect(label).toHaveAttribute('for', 'test-id');
    });
*/
    it('should not have basic accessibility issues', axeTest(TestPagination()));
  });

  describe('className', () => {
    it('should have the given custom classname ', () => {
      const { container } = render(
        TestPagination({ className: 'custom-classname' }),
      );
      expect(container.firstChild).toHaveClass('custom-classname');
    });
  });

  /*

  describe('onBlur', () => {
    test('should notice when leaving area', () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(TestSearchInput({ onBlur: mockOnBlur }));
      const inputElement = getByRole('searchbox');
      fireEvent.blur(inputElement);
      expect(mockOnBlur).toBeCalledTimes(1);
    });
  });
  */

  describe('onChange', () => {
    it('should notice input field change and call with the given number', () => {
      const mockOnChange = jest.fn();
      const { getByPlaceholderText, getAllByRole } = render(
        TestPagination({ onChange: mockOnChange }),
      );
      const inputElement = getByPlaceholderText(
        'placeholder text',
      ) as HTMLTextAreaElement;
      fireEvent.change(inputElement, { target: { value: '3' } });
      const actionButton = getAllByRole('button')[2];
      fireEvent.click(actionButton);
      expect(mockOnChange).toBeCalledTimes(1);
      expect(mockOnChange).toBeCalledWith(3);
    });

    it('should notice next button click', () => {
      const mockOnChange = jest.fn();
      const { getAllByRole } = render(
        TestPagination({ onChange: mockOnChange, currentPage: 3 }),
      );

      const nextButton = getAllByRole('button')[1];
      fireEvent.click(nextButton);
      expect(mockOnChange).toBeCalledTimes(1);
      expect(mockOnChange).toBeCalledWith(4);
    });

    it('should notice previous button click', () => {
      const mockOnChange = jest.fn();
      const { getAllByRole } = render(
        TestPagination({ onChange: mockOnChange, currentPage: 3 }),
      );

      const previousButton = getAllByRole('button')[0];
      fireEvent.click(previousButton);
      expect(mockOnChange).toBeCalledTimes(1);
      expect(mockOnChange).toBeCalledWith(2);
    });
  });

  /*

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

  */
  describe('ref', () => {
    it('ref is forwarded to input', () => {
      const ref = React.createRef<HTMLElement>();

      render(
        <Pagination
          data-testid="pagination"
          currentPage={1}
          lastPage={6}
          pageInput={true}
          smallScreen={false}
          invalidValueErrorText="is invalid value"
          ariaNextButtonLabel="Next"
          ariaPreviousButtonLabel="Previous"
          pageInputButtonText="Siirry"
          inputPlaceholderText="placeholder text"
          onChange={(page) => {
            console.log('on change: ', page);
          }}
          textFunction={(current, last) => `Page ${current} / ${last}`}
          aria-label="my label"
          ref={ref}
        />,
      );

      expect(ref.current?.tagName).toBe('NAV');
    });
  });
});

/*
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

*/
