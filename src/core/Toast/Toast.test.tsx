import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from './Toast';
import { axeTest } from '../../utils/test';

describe('props', () => {
  describe('children', () => {
    const ToastWithElementChild = (
      <Toast headingText="Lorem ipsum dolor sit">
        <div>Test Toast</div>
      </Toast>
    );

    it('has the given content', () => {
      const { container } = render(ToastWithElementChild);
      expect(container.firstChild).toHaveTextContent('Test Toast');
    });

    it('should match snapshot', () => {
      const { container } = render(ToastWithElementChild);
      expect(container).toMatchSnapshot();
    });
  });

  describe('className', () => {
    const customClassToast = (
      <Toast className="custom-class" headingText="Lorem ipsum dolor sit">
        Test content
      </Toast>
    );

    it('contains base classname', () => {
      const { container } = render(customClassToast);
      expect(container.firstChild).toHaveClass('fi-toast');
    });

    it('contains custom classname', () => {
      const { container } = render(customClassToast);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
  describe('ariaLiveMode', () => {
    const ToastWithDefaultAriaLiveMode = (
      <Toast id="testId" ariaLiveMode="off" headingText="Lorem ipsum dolor sit">
        Testcontent
      </Toast>
    );

    it('should have specified aria-live mode', () => {
      const { container } = render(ToastWithDefaultAriaLiveMode);
      expect(container.querySelector('#testId')).toHaveClass(
        'fi-toast-content-wrapper',
      );
      expect(container.querySelector('#testId')).toHaveAttribute(
        'aria-live',
        'off',
      );
    });
  });
});

describe('accessibility', () => {
  const TestToast = <Toast>Testcontent</Toast>;
  test('should not have basic accessibility issues', axeTest(TestToast));
});
