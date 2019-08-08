import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Link } from './Link';

const TestLinkExternal = (
  <Link.external
    href="/"
    data-testid="test-link"
    labelNewWindow="Opens in a new window"
  >
    Hey this is test
  </Link.external>
);

test('calling render with the same component on the same container does not remount', () => {
  const LinkRendered = render(TestLinkExternal);
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe(
    'Hey this is testOpens in a new window',
  );
});

test('should not have basic accessibility issues', axeTest(TestLinkExternal));
