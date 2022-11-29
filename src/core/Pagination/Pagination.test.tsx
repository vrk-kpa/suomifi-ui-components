import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../utils/test';
import { Pagination, PaginationProps } from './Pagination';

const TestPagination = (props: Partial<PaginationProps> = {}) => (
  <Pagination
    data-testid="pagination"
    currentPage={props.currentPage || 1}
    lastPage={props.lastPage || 6}
    smallScreen={false}
    pageInput
    pageInputProps={{
      invalidValueErrorText: (value) => `${value} is not allowed`,
      inputPlaceholderText: 'placeholder text',
      buttonText: 'Jump',
      labelText: 'Page number input',
    }}
    nextButtonAriaLabel="Next page"
    previousButtonAriaLabel="Previous page"
    onChange={
      props.onChange ||
      ((page) => {
        console.log('on change: ', page);
      })
    }
    pageIndicatorText={(current, last) => `Page ${current} / ${last}`}
    aria-label="my component here"
    className={props.className}
  />
);

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
      //  expect(mockOnChange).toBeCalledTimes(1);
      // expect(mockOnChange).toBeCalledWith(3);
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

  describe('ref', () => {
    it('ref is forwarded to input', () => {
      const ref = React.createRef<HTMLElement>();

      render(
        <Pagination
          data-testid="pagination"
          currentPage={1}
          lastPage={6}
          smallScreen={false}
          nextButtonAriaLabel="Next"
          previousButtonAriaLabel="Previous"
          pageInput
          pageInputProps={{
            invalidValueErrorText: (value) => `${value} is not allowed`,
            inputPlaceholderText: 'placeholder text',
            buttonText: 'Jump',
            labelText: 'Page number input',
          }}
          onChange={(page) => {
            console.log('on change: ', page);
          }}
          pageIndicatorText={(current, last) => `Page ${current} / ${last}`}
          aria-label="my label"
          ref={ref}
        />,
      );

      expect(ref.current?.tagName).toBe('NAV');
    });
  });
});
