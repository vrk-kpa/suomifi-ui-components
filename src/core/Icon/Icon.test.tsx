import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Icon } from './Icon';

const testIcon = (
  <Icon ariaLabel="Test label" className="my-icon--test" data-testid="icon" />
);

const TestIcons = (
  <div>
    {testIcon}
    <Icon icon="heart" />;
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const svgRenderer = render(TestIcons);
  const { getByTestId, container } = svgRenderer;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('icon')).toBeDefined();

  // re-render the same component with different props
  const testRenderer = render(testIcon);
  const { rerender } = testRenderer;
  rerender(
    <Icon
      ariaLabel="Test label"
      className="my-icon--test"
      data-testid="noci"
    />,
  );
  expect(getByTestId('noci')).toBeDefined();
});

test('should not have basic accessibility issues', axeTest(TestIcons));
