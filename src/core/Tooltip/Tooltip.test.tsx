import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';
import { axeTest } from '../../utils/test';

describe('props', () => {
  /**
 * Note for the following tests:
      For some reason, two identical buttons are returned in the start when there should be only one toggle button.
      Therefore need to use getAllByRole to get the toggle button.
      `const toggleButton = screen.getAllByRole('button')[0];`
 */
  describe('children', () => {
    it('should have the given text', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
        >
          Children of the component
        </Tooltip>,
      );
      const toggleButton = screen.getAllByRole('button')[0];
      await user.click(toggleButton);
      expect(screen.getByText('Children of the component')).toBeInTheDocument();
    });
  });

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
      const toggleButton = screen.getAllByRole('button')[0];
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle tooltip');
    });
  });

  describe('ariaCloseButtonLabelText', () => {
    it('should have the given value', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
        >
          Test Tooltip
        </Tooltip>,
      );
      const toggleButton = screen.getAllByRole('button')[0];
      await user.click(toggleButton);
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
      const toggleButton = screen.getAllByRole('button')[0];
      expect(toggleButton).toHaveClass('custom-class');
    });
  });

  describe('contentClassName', () => {
    test('content should have the given className', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
          contentClassName="custom-class"
        >
          Test Tooltip
        </Tooltip>,
      );
      const toggleButton = screen.getAllByRole('button')[0];
      await user.click(toggleButton);
      const contentDiv = screen.getAllByRole('button')[1].parentElement;
      expect(contentDiv).toHaveClass('custom-class');
    });
  });

  describe('onToggleButtonClick', () => {
    it('is clicked; given method called', async () => {
      const user = userEvent.setup();
      const mockClickHandler = jest.fn();
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
          onToggleButtonClick={mockClickHandler}
        >
          Test Tooltip
        </Tooltip>,
      );
      const toggleButton = screen.getAllByRole('button')[0];
      await user.click(toggleButton);
      expect(mockClickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCloseButtonClick', () => {
    it('is clicked; given method called', async () => {
      const user = userEvent.setup();
      const mockClickHandler = jest.fn();
      render(
        <Tooltip
          ariaCloseButtonLabelText="Close tooltip"
          ariaToggleButtonLabelText="Toggle tooltip"
          onCloseButtonClick={mockClickHandler}
        >
          Test Tooltip
        </Tooltip>,
      );

      const toggleButton = screen.getAllByRole('button')[0];
      await user.click(toggleButton);
      const closeButton = screen.getAllByRole('button')[1];
      await user.click(closeButton);

      await waitFor(() => {
        expect(mockClickHandler).toHaveBeenCalledTimes(1);
      });
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

describe('Basic tooltip', () => {
  it('should match snapshot', async () => {
    const user = userEvent.setup();
    const BasicTooltip = (
      <Tooltip
        ariaCloseButtonLabelText="Close tooltip"
        ariaToggleButtonLabelText="Toggle tooltip"
      >
        Test Tooltip
      </Tooltip>
    );
    const { container } = render(BasicTooltip);
    const toggleButton = screen.getAllByRole('button')[0];
    await user.click(toggleButton);
    expect(container).toMatchSnapshot();
  });
});

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <Tooltip
        ariaToggleButtonLabelText=""
        ariaCloseButtonLabelText=""
        margin="xs"
      >
        Test
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });
});
