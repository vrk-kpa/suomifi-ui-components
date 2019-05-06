import React from 'react';
import { render } from 'react-testing-library';

import { Link } from './Link';

test('calling render with the same component on the same container does not remount', () => {
  const LinkRendered = render(
    <Link href="/" data-testid="test-link">
      Hey this is test
    </Link>,
  );
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe('Hey this is test');
});
