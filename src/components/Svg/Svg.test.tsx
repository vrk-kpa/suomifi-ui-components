import React from 'react';
import { render } from 'react-testing-library';

import { Svg } from './Svg';
import testSvg from './test.svg';

test('calling render with the same component on the same container does not remount', () => {
  const svgRenderer = render(<Svg src={testSvg} testId="svg" />);
  const { getByTestId, container, rerender } = svgRenderer;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('svg')).toBeDefined();

  // re-render the same component with different props
  rerender(<Svg src={testSvg} testId="gvs" />);
  expect(getByTestId('gvs')).toBeDefined();
});
