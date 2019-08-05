import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Icon } from './Icon';

const TestIcon = <Icon data-testid="icon" />;

test('calling render with the same component on the same container does not remount', () => {
  const svgRenderer = render(TestIcon);
  const { getByTestId, container, rerender } = svgRenderer;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('icon')).toBeDefined();

  // re-render the same component with different props
  rerender(<Icon data-testid="noci" />);
  expect(getByTestId('noci')).toBeDefined();
});

test('should not have basic accessibility issues', axeTest(TestIcon));
