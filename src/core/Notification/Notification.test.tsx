import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Notification } from './Notification';
import { axeTest } from '../../utils/test';

describe('props', () => {
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
  describe('children', () => {
    const notificationWithElementChild = (
      <Notification closeText="Close" headingText="Lorem ipsum dolor sit">
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

  describe('className', () => {
    const customClassNotification = (
      <Notification
        closeText="Close"
        className="custom-class"
        headingText="Lorem ipsum dolor sit"
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
        headingText="Lorem ipsum dolor sit"
        closeText="Close"
        closeButtonProps={{
          'aria-labelledby': 'test-element',
          'aria-label': 'test-label',
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
      expect(getByRole('button')).toHaveAttribute('aria-label', 'test-label');
      expect(getByRole('button')).toHaveAttribute('disabled');
      expect(getByRole('button')).toHaveTextContent('Close');
    });
  });
  describe('ariaLiveMode', () => {
    const NotificationWithDefaultAriaLiveMode = (
      <Notification
        id="testId"
        closeText="Close"
        ariaLiveMode="off"
        headingText="Lorem ipsum dolor sit"
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

  describe('regionAriaLabel', () => {
    const NotificationWithRegionAriaLabel = (
      <Notification
        closeText="Close"
        regionAriaLabel="test-label"
        headingText="Lorem ipsum dolor sit"
      >
        Testcontent
      </Notification>
    );

    const NotificationWithoutRegionAriaLabel = (
      <Notification closeText="Close" headingText="Lorem ipsum dolor sit">
        Testcontent
      </Notification>
    );

    it('should have specified aria-label', () => {
      const { getByRole } = render(NotificationWithRegionAriaLabel);
      expect(getByRole('region')).toHaveAttribute('aria-label', 'test-label');
    });

    it('should use headingText as fallback aria-label', () => {
      const { getByRole } = render(NotificationWithoutRegionAriaLabel);
      expect(getByRole('region')).toHaveAttribute(
        'aria-label',
        'Lorem ipsum dolor sit',
      );
    });
  });
  describe('onClick', () => {
    test('onClick event is called when clicked', () => {
      const mockClick = jest.fn();
      const { getByRole } = render(
        <Notification
          closeText="Close"
          onClick={mockClick}
          headingText="Lorem ipsum dolor sit"
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
    <Notification closeText="Close">Testcontent</Notification>
  );
  test('should not have basic accessibility issues', axeTest(TestNotification));
});
