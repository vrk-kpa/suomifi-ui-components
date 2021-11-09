import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';
import { axeTest } from '../../../utils/test';

describe('status', () => {
  const ErrorAlert = (
    <Alert status="error" closeText="Close">
      Testcontent
    </Alert>
  );

  test('error status should have correct classname applied', () => {
    const { container } = render(ErrorAlert);
    expect(container.firstChild).toHaveClass('fi-alert--error');
  });

  const WarningAlert = (
    <Alert status="warning" closeText="Close">
      General warning
    </Alert>
  );

  test('warning status should have correct classname applied', () => {
    const { container } = render(WarningAlert);
    expect(container.firstChild).toHaveClass('fi-alert--warning');
  });
});
describe('props', () => {
  describe('className', () => {
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

  test('closeButton should have the given closeButtonProps', () => {
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
    const { getByRole } = render(AlertWithButtonProps);
    const closeButton = getByRole('button');

    expect(closeButton).toHaveAttribute('aria-labelledby', 'test-element');
    expect(closeButton).toHaveAttribute('disabled');
    expect(closeButton).toHaveClass('testClass');
  });
  describe('Aria-live mode and className check', () => {
    const AlertWithDefaultAriaLiveMode = (
      <Alert id="testIdDefault" closeText="Close">
        Testcontent
      </Alert>
    );
    const AlertWithAriaLiveModeOff = (
      <Alert id="testIdOff" closeText="Close" ariaLiveMode="off">
        Testcontent
      </Alert>
    );
    it('should have default aria-live mode', () => {
      const { container } = render(AlertWithDefaultAriaLiveMode);
      expect(container.querySelector('#testIdDefault')).toHaveClass(
        'fi-alert_text-content-wrapper',
      );
      expect(container.querySelector('#testIdDefault')).toHaveAttribute(
        'aria-live',
        'assertive',
      );
    });
    it('should have specified aria-live mode', () => {
      const { container } = render(AlertWithAriaLiveModeOff);
      expect(container.querySelector('#testIdOff')).toHaveAttribute(
        'aria-live',
        'off',
      );
    });
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
