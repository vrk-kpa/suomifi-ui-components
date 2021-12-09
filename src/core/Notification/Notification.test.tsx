import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Notification } from './Notification';
import { axeTest } from '../../utils/test';

describe('Error view tests', () => {
  const ErrorNotification = (
    <Notification
      status="error"
      className="notification-test-class"
      closeText="Close"
      smallScreen
      labelText="Lorem ipsum dolor sit"
    >
      Testcontent
    </Notification>
  );

  it('should have status and smallScreen prop specific classNames', () => {
    const { container } = render(ErrorNotification);
    expect(container.firstChild).toHaveClass('fi-notification--error');
    expect(container.firstChild).toHaveClass('fi-notification--small-screen');
  });
  it('should have given className as props', () => {
    const { container } = render(ErrorNotification);
    expect(container.firstChild).toHaveClass('notification-test-class');
  });
});
describe('props', () => {
  describe('children', () => {
    const notificationWithElementChild = (
      <Notification closeText="Close" labelText="Lorem ipsum dolor sit">
        <div>Test notification</div>
      </Notification>
    );

    it('has the given content', () => {
      const { container } = render(notificationWithElementChild);
      expect(container.firstChild).toHaveTextContent('Test notification');
    });

    it('should match snapshot', () => {
      const { container } = render(notificationWithElementChild);
      expect(container).toMatchSnapshot();
    });
  });

  describe('classnames', () => {
    const customClassNotification = (
      <Notification
        closeText="Close"
        className="custom-class"
        labelText="Lorem ipsum dolor sit"
      >
        Test content
      </Notification>
    );

    it('contains base classname', () => {
      const { container } = render(customClassNotification);
      expect(container.firstChild).toHaveClass('fi-notification');
    });

    it('contains custom classname', () => {
      const { container } = render(customClassNotification);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
  const NotificationWithButtonProps = (
    <Notification
      labelText="Lorem ipsum dolor sit"
      closeText="Close"
      closeButtonProps={{
        'aria-labelledby': 'test-element',
        disabled: true,
        className: 'testClass',
      }}
    >
      Testcontent
    </Notification>
  );
  it('Button should contains custom classname', () => {
    const { getByRole } = render(NotificationWithButtonProps);
    expect(getByRole('button')).toHaveClass('testClass');
  });
  it('Button should have given props', () => {
    const { getByRole } = render(NotificationWithButtonProps);
    expect(getByRole('button')).toHaveAttribute(
      'aria-labelledby',
      'test-element',
    );
    expect(getByRole('button')).toHaveAttribute('disabled');
    expect(getByRole('button')).toHaveTextContent('CLOSE');
  });

  const NotificationWithDefaultAriaLiveMode = (
    <Notification
      id="testId"
      closeText="Close"
      ariaLiveMode="off"
      labelText="Lorem ipsum dolor sit"
    >
      Testcontent
    </Notification>
  );

  it('should have specified aria-live mode', () => {
    const { container } = render(NotificationWithDefaultAriaLiveMode);
    expect(container.querySelector('#testId')).toHaveClass(
      'fi-notification_text-content-wrapper',
    );
    expect(container.querySelector('#testId')).toHaveAttribute(
      'aria-live',
      'off',
    );
  });
  test('onClick event is called when clicked', () => {
    const mockClick = jest.fn();
    const { getByRole } = render(
      <Notification
        closeText="Close"
        onClick={mockClick}
        labelText="Lorem ipsum dolor sit"
      >
        Test content
      </Notification>,
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});

describe('accessibility', () => {
  const TestNotification = (
    <Notification closeText="Close" labelText="Lorem ipsum dolor sit">
      Testcontent
    </Notification>
  );
  test('should not have basic accessibility issues', axeTest(TestNotification));
});
