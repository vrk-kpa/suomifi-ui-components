import React from 'react';
import { render } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { axeTest } from '../../utils/test';

describe('props', () => {
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
