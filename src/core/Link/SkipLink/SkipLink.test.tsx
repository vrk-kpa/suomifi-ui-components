import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { SkipLink } from './SkipLink';

const TestSkipLink = (
  <SkipLink href="/" data-testid="test-link">
    Hey this is test
  </SkipLink>
);

test('calling render with the same component on the same container does not remount', () => {
  const LinkRendered = render(TestSkipLink);
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe(
    'Hey this is testOpens in a new window',
  );
});

test('should not have basic accessibility issues', axeTest(TestSkipLink));
