import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';
import { InlineAlert } from '../InlineAlert/InlineAlert';
import { axeTest } from '../../../utils/test';

describe('children', () => {
  const alertWithElementChild = (
    <Alert closeText="Close">
      <div>Test alert</div>
    </Alert>
  );

  it('has the given content', () => {
    const { container } = render(alertWithElementChild);
    expect(container.firstChild).toHaveTextContent('Test alert');
  });

  it('should match snapshot', () => {
    const { container } = render(alertWithElementChild);
    expect(container).toMatchSnapshot();
  });
});

describe('classnames', () => {
  const customClassAlert = (
    <Alert closeText="Close" className="custom-class">
      Test content
    </Alert>
  );

  it('contains base classname', () => {
    const { container } = render(customClassAlert);
    expect(container.firstChild).toHaveClass('fi-alert');
  });

  it('contains custom classname', () => {
    const { container } = render(customClassAlert);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

describe('props', () => {
  const AlertWithButtonProps = (
    <Alert
      closeText="Close"
      closeButtonProps={{
        'aria-labelledby': 'test-element',
        disabled: true,
        className: 'testClass',
      }}
    >
      Testcontent
    </Alert>
  );
  it('Button should contains custom classname', () => {
    const { getByRole } = render(AlertWithButtonProps);
    expect(getByRole('button')).toHaveClass('testClass');
  });
  it('Button should have given props', () => {
    const { getByRole } = render(AlertWithButtonProps);
    expect(getByRole('button')).toHaveAttribute(
      'aria-labelledby',
      'test-element',
    );
    expect(getByRole('button')).toHaveAttribute('disabled');
    expect(getByRole('button')).toHaveTextContent('CLOSE');
  });

  const InlineAlertComponent = (
    <InlineAlert labelText="Inline Alert label">Testcontent</InlineAlert>
  );

  it('Inline component should contain given labelText', () => {
    const { getByText } = render(InlineAlertComponent);
    const label = getByText('Inline Alert label');
    expect(label).toHaveClass('fi-alert_label');
  });

  const ErrorAlert = (
    <Alert
      status="error"
      className="alert-test-class"
      closeText="Close"
      smallScreen
    >
      Testcontent
    </Alert>
  );

  it('should have status and smallScreen prop specific classNames', () => {
    const { container } = render(ErrorAlert);
    expect(container.firstChild).toHaveClass('fi-alert--error');
    expect(container.firstChild).toHaveClass('fi-alert--small-screen');
  });
  it('should have given className as props', () => {
    const { container } = render(ErrorAlert);
    expect(container.firstChild).toHaveClass('alert-test-class');
  });

  const AlertWithDefaultAriaLiveMode = (
    <Alert id="testId" closeText="Close" ariaLiveMode="off">
      Testcontent
    </Alert>
  );

  it('should have specified aria-live mode', () => {
    const { container } = render(AlertWithDefaultAriaLiveMode);
    expect(container.querySelector('#testId')).toHaveClass(
      'fi-alert_text-content-wrapper',
    );
    expect(container.querySelector('#testId')).toHaveAttribute(
      'aria-live',
      'off',
    );
  });
  test('onClick event is called when clicked', () => {
    const mockClick = jest.fn();
    const { getByRole } = render(
      <Alert closeText="Close" onClick={mockClick}>
        Test content
      </Alert>,
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});

describe('accessibility', () => {
  const TestAlert = <Alert closeText="Close">Testcontent</Alert>;
  test('should not have basic accessibility issues', axeTest(TestAlert));
});
