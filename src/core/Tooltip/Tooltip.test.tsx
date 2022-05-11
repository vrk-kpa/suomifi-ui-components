import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { axeTest } from '../../utils/test';

describe('Basic tooltip', () => {
  const BasicTooltip = (
    <Tooltip
      ariaCloseButtonLabelText="Close tooltip"
      ariaToggleButtonLabelText="Toggle tooltip"
    >
      Test Tooltip
    </Tooltip>
  );
  const { container } = render(BasicTooltip);
  expect(container).toMatchSnapshot();
});

describe('props', () => {
  describe('ariaToggleButtonLabelText', () => {
    it('should have the given value', () => {
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
        >
          Test Tooltip
        </Tooltip>,
      );

      // FIXME: For some reason, two identical buttons are returned.
      const toggleButton = screen.getAllByRole('button')[0];
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle tooltip');
    });
  });

  describe('ariaCloseButtonLabelText', () => {
    it('should have the given value', () => {
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
        >
          Test Tooltip
        </Tooltip>,
      );

      // FIXME: For some reason, two identical buttons are returned.
      const toggleButton = screen.getAllByRole('button')[0];
      toggleButton.click();
      const closeButton = screen.getAllByRole('button')[1];
      expect(closeButton).toHaveAttribute('aria-label', 'Close tooltip');
    });
  });

  describe('toggleButtonClassName', () => {
    test('toggleButton should have the given className', () => {
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
          toggleButtonClassName="custom-class"
        >
          Test Tooltip
        </Tooltip>,
      );
      // FIXME: For some reason, two identical buttons are returned.
      const toggleButton = screen.getAllByRole('button')[0];
      expect(toggleButton).toHaveClass('custom-class');
    });
  });

  describe('contentClassName', () => {
    test('content should have the given className', () => {
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
          contentClassName="custom-class"
        >
          Test Tooltip
        </Tooltip>,
      );
      // FIXME: For some reason, two identical buttons are returned.
      const toggleButton = screen.getAllByRole('button')[0];
      toggleButton.click();
      const contentDiv = screen.getAllByRole('button')[1].parentElement;
      expect(contentDiv).toHaveClass('custom-class');
    });
  });
});

describe('accessibility', () => {
  const TestTooltip = (
    <Tooltip
      ariaCloseButtonLabelText="Close tooltip"
      ariaToggleButtonLabelText="Toggle tooltip"
    >
      Test Tooltip
    </Tooltip>
  );
  test('should not have basic accessibility issues', axeTest(TestTooltip));
});
