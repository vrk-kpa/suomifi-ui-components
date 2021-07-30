import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { SkipLink } from './SkipLink';

const TestSkipLink = (
  <SkipLink href="/" data-testid="test-link">
    Test content
  </SkipLink>
);

test('should match snapshot', () => {
  const LinkRendered = render(TestSkipLink);
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe('Test content');
});

test('should not have basic accessibility issues', axeTest(TestSkipLink));
