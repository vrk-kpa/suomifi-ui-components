import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from './Alert';
import { axeTest } from '../../utils/test';

describe('children', () => {
  const alertWithElementChild = (
    <Alert>
      <div data-testid="test-div">Test alert</div>
    </Alert>
  );

  it('has the given content', () => {
    const { getByTestId } = render(alertWithElementChild);
    expect(getByTestId('test-div').textContent).toBe('Test alert');
  });

  it('should match snapshot', () => {
    const { container } = render(alertWithElementChild);
    expect(container).toMatchSnapshot();
  });
});

describe('classnames', () => {
  const customClassAlert = <Alert className="custom-class">Test content</Alert>;

  it('contains base classname', () => {
    const { container } = render(customClassAlert);
    expect(container.firstChild).toHaveClass('fi-alert');
  });

  it('contains custom classname', () => {
    const { container } = render(customClassAlert);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should match snapshot', () => {
    const { container } = render(customClassAlert);
    expect(container).toMatchSnapshot();
  });
});

describe('props', () => {
  const AlertWithButtonProps = (
    <Alert
      closeText="Close"
      closeButtonProps={{ 'aria-labelledby': 'test-element', disabled: true }}
    >
      Testcontent
    </Alert>
  );

  it('Button should have given props', () => {
    const { getByRole } = render(AlertWithButtonProps);
    expect(getByRole('button')).toHaveAttribute(
      'aria-labelledby',
      'test-element',
    );
    expect(getByRole('button')).toHaveAttribute('disabled');
  });

  const InlineAlert = (
    <Alert
      className="custom-class"
      closeText="Close"
      labelText="Alert label"
      inline
    >
      Testcontent
    </Alert>
  );

  it('Inline variant should contain given labelText', () => {
    const { getByText } = render(InlineAlert);
    const label = getByText('Alert label');
    expect(label).toHaveClass('fi-alert-label');
  });

  const ErrorAlert = (
    <Alert status="error" closeText="Close" smallScreen>
      Testcontent
    </Alert>
  );

  it('should have status and smallScreen prop specific classNames', () => {
    const { container } = render(ErrorAlert);
    expect(container.firstChild).toHaveClass('fi-alert--error');
    expect(container.firstChild).toHaveClass('fi-alert--small-screen');
  });
});

describe('accessibility', () => {
  const TestAlert = (
    <Alert className="custom-class" closeText="Sulje">
      Testcontent
    </Alert>
  );
  test('should not have basic accessibility issues', axeTest(TestAlert));
});
