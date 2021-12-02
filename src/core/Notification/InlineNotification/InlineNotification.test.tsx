import React from 'react';
import { render } from '@testing-library/react';
import { InlineNotification } from './InlineNotification';
import { axeTest } from '../../../utils/test';

describe('props', () => {
  describe('children', () => {
    const notificationWithElementChild = (
      <InlineNotification labelText="Lorem ipsum dolor sit">
        <div>Test notification</div>
      </InlineNotification>
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
  describe('labelText', () => {
    const InlineInlineNotificationComponent = (
      <InlineNotification labelText="Inline Notification label">
        Testcontent
      </InlineNotification>
    );
    it('should contain given labelText', () => {
      const { getByText } = render(InlineInlineNotificationComponent);
      const label = getByText('Inline Notification label');
      expect(label).toHaveClass('fi-notification_label');
    });
  });
});
describe('accessibility', () => {
  const TestNotification = (
    <InlineNotification labelText="Lorem ipsum dolor sit">
      Testcontent
    </InlineNotification>
  );
  test('should not have basic accessibility issues', axeTest(TestNotification));
});
