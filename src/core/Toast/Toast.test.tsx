import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from './Toast';
import { axeTest } from '../../utils/test';

describe('props', () => {
  describe('headingText', () => {
    const ToastWithElementChild = (
      <Toast headingText="Test heading">Test Toast</Toast>
    );
    const { container } = render(ToastWithElementChild);
    expect(container.firstChild).toHaveTextContent('Test heading');
  });
  describe('headingVariant', () => {
    const { getByRole } = render(
      <Toast headingText="Test heading" headingVariant="h3">
        Test Toast
      </Toast>,
    );
    const heading = getByRole('heading', { level: 3 });
    expect(heading).toHaveClass('fi-heading--h3');
  });
  describe('id', () => {
    const ToastWithElementId = <Toast id="TestId">Test Toast</Toast>;
    const { container } = render(ToastWithElementId);
    expect(container.querySelector('#TestId')).toHaveClass(
      'fi-toast-content-wrapper',
    );
  });

  describe('children', () => {
    const ToastWithElementChild = (
      <Toast>
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
      <Toast className="custom-class">Test content</Toast>
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
    const ToastWithDefaultAriaLiveMode = <Toast id="testId">Testcontent</Toast>;
    const ToastWithAriaLiveModeOff = (
      <Toast id="testId" ariaLiveMode="off">
        Testcontent
      </Toast>
    );
    it('should have default aria-live mode', () => {
      const { container } = render(ToastWithDefaultAriaLiveMode);
      expect(container.querySelector('#testId')).toHaveAttribute(
        'aria-live',
        'polite',
      );
    });
    it('should have specified aria-live mode', () => {
      const { container } = render(ToastWithAriaLiveModeOff);
      expect(container.querySelector('#testId')).toHaveAttribute(
        'aria-live',
        'off',
      );
    });
  });
});

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(<Toast margin="xs" />);
    expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
  });
});

describe('accessibility', () => {
  const TestToast = <Toast>Testcontent</Toast>;
  test('should not have basic accessibility issues', axeTest(TestToast));
});
