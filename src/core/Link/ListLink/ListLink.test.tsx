import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { ListLink } from './ListLink';
import { Link } from '../Link/Link';

const TestListLink = (
  <ListLink data-testid="test-link">
    <Link href="/">Linkki</Link>
  </ListLink>
);

test('calling render with the same component on the same container does not remount', () => {
  const ListLinkRendered = render(TestListLink);
  const { getByTestId, container } = ListLinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe('Hey this is test');
});

test('should not have underline class by default', () => {
  const { container } = render(TestListLink);
  expect(container.firstChild).not.toHaveClass('fi-link--initial-underline');
});

test('should not have basic accessibility issues', axeTest(TestListLink));
