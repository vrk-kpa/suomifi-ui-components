import React from 'react';
import { render } from 'react-testing-library';

import { Link } from './Link';

test('calling render with the same component on the same container does not remount', () => {
  const LinkRendered = render(
    <Link.external
      href="/"
      data-testid="test-link"
      labelNewWindow="Opens in a new window"
    >
      Hey this is test
    </Link.external>,
  );
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe(
    'Hey this is testOpens in a new window',
  );
});
