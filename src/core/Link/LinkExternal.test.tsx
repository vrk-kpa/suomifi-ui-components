import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { LinkExternal } from './LinkExternal';

const TestLinkExternal = (
  <LinkExternal
    href="/"
    data-testid="test-link"
    labelNewWindow="Opens in a new window"
  >
    Hey this is test
  </LinkExternal>
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
