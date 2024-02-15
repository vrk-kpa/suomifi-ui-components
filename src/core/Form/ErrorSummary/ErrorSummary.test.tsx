import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { ErrorSummary } from './ErrorSummary';

const testRef = createRef<HTMLHeadingElement>();
const errorSummaryItems = [
  { text: 'Error 1', inputId: 'input1' },
  { text: 'Error 2', inputId: 'input2' },
];

describe('snapshots match', () => {
  test('minimal implementation', () => {
    const { baseElement } = render(
      <ErrorSummary
        headingText="There are errors in the form"
        headingRef={testRef}
        items={errorSummaryItems}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  test('smallScreen styles', () => {
    const { baseElement, container } = render(
      <ErrorSummary
        headingText="There are errors in the form"
        headingRef={testRef}
        items={errorSummaryItems}
        smallScreen
      />,
    );
    expect(baseElement).toMatchSnapshot();
    expect(container.firstChild).toHaveClass('fi-error-summary--small-screen');
  });
});

describe('funcionality', () => {
  it('should render provided items', () => {
    const { getByText } = render(
      <ErrorSummary
        headingText="There are errors in the form"
        headingRef={testRef}
        items={errorSummaryItems}
      />,
    );
    errorSummaryItems.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
  });
});
