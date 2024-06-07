import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';
import { axeTest } from '../../utils/test';

describe('props', () => {
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
  describe('Alert role and className check', () => {
    const DefaultAlert = (
      <Alert id="testIdDefault" closeText="Close">
        Testcontent
      </Alert>
    );

    it('should have alert role by default', () => {
      const { container } = render(DefaultAlert);
      expect(container.querySelector('#testIdDefault')).toHaveClass(
        'fi-alert_text-content-wrapper',
      );
      expect(container.querySelector('#testIdDefault')).toHaveAttribute(
        'role',
        'alert',
      );
    });
  });

  describe('margin prop', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<Alert closeText="Close" margin="xs" />);
      expect(container.firstChild).toHaveStyle('margin: 10px');
    });

    it('should have margin style overwritten from style', () => {
      const { container } = render(
        <Alert closeText="Close" margin="xs" style={{ margin: 2 }} />,
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
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
