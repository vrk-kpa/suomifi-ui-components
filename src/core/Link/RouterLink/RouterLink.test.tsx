import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { RouterLink } from './RouterLink';

const TestRouterLink = (
  <RouterLink href="/" data-testid="test-link">
    Hey this is a test
  </RouterLink>
);

const RouterLinkAsButton = (
  <RouterLink asComponent="button">Router link as a button</RouterLink>
);

test('calling render with the same component on the same container does not remount', () => {
  const { getByTestId, container } = render(TestRouterLink);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe('Hey this is a test');
});

it('should still have the correct styles applied when rendered as something other than <a> ', () => {
  const { container } = render(RouterLinkAsButton);
  expect(container.firstChild).toHaveClass('fi-link--router');
});

test('should not have basic accessibility issues', axeTest(TestRouterLink));
