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
  describe('close button', () => {
    const ToastWithCloseButton = (
      <Toast showCloseButton closeText="Close">
        Testcontent
      </Toast>
    );
    it('should have close button', () => {
      const { container } = render(ToastWithCloseButton);
      expect(
        container.querySelector('.fi-toast_close-button'),
      ).toBeInTheDocument();
    });
    it('has close text as aria-label', () => {
      const { container } = render(ToastWithCloseButton);
      expect(container.querySelector('.fi-toast_close-button')).toHaveAttribute(
        'aria-label',
        'Close',
      );
    });
    it('has given onClick callback', () => {
      const onCloseButtonClick = jest.fn();
      const { getByLabelText } = render(
        <Toast
          showCloseButton
          closeText="Close"
          onCloseButtonClick={onCloseButtonClick}
        >
          Testcontent
        </Toast>,
      );
      getByLabelText('Close').click();
      expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
    });
    it('has given custom props', () => {
      const { container } = render(
        <Toast
          showCloseButton
          closeText="Close"
          closeButtonProps={{ className: 'custom-class' }}
        >
          Testcontent
        </Toast>,
      );
      expect(container.querySelector('.fi-toast_close-button')).toHaveClass(
        'custom-class',
      );
    });
  });
});

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(<Toast margin="xs" />);
    expect(container.firstChild).toHaveStyle('margin: 10px');
  });

  it('should have margin style overridden by style prop', async () => {
    const { container } = render(<Toast margin="xs" style={{ margin: 2 }} />);
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});

describe('accessibility', () => {
  const TestToast = <Toast>Testcontent</Toast>;
  test('should not have basic accessibility issues', axeTest(TestToast));
});
