import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Notification } from './Notification';
import { axeTest } from '../../utils/test';

describe('Status', () => {
  describe('Default', () => {
    const DefaultNotification = (
      <Notification closeText="Close">Testcontent</Notification>
    );
    it('should have neutral className', () => {
      const { container } = render(DefaultNotification);
      expect(container.firstChild).toHaveClass('fi-notification--neutral');
    });
  });
  describe('Neutral', () => {
    const NeutralNotification = (
      <Notification status="neutral" closeText="Close">
        Testcontent
      </Notification>
    );
    it('should have neutral className', () => {
      const { container } = render(NeutralNotification);
      expect(container.firstChild).toHaveClass('fi-notification--neutral');
    });
  });
  describe('Error', () => {
    const ErrorNotification = (
      <Notification status="error" closeText="Close" smallScreen>
        Testcontent
      </Notification>
    );
    it('should have error className', () => {
      const { container } = render(ErrorNotification);
      expect(container.firstChild).toHaveClass('fi-notification--error');
    });
  });
});
describe('smallScreen', () => {
  const SmallScreenNotification = (
    <Notification closeText="Close" smallScreen>
      Testcontent
    </Notification>
  );
  it('should have status and smallScreen prop specific classNames', () => {
    const { container, getByRole } = render(SmallScreenNotification);
    expect(container.firstChild).toHaveClass('fi-notification--small-screen');
    expect(getByRole('button')).toHaveAttribute('aria-label', 'Close');
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

  describe('classname', () => {
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
  describe('closeButtonProps', () => {
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
      expect(getByRole('button')).toHaveTextContent('Close');
    });
  });
  describe('aria-live mode', () => {
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
  });
  describe('aonClick', () => {
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
});

describe('accessibility', () => {
  const TestNotification = (
    <Notification closeText="Close" labelText="Lorem ipsum dolor sit">
      Testcontent
    </Notification>
  );
  test('should not have basic accessibility issues', axeTest(TestNotification));
});
