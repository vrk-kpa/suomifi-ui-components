import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { LinkListItem } from './LinkListItem';
import { LinkList } from '../LinkList/LinkList';
import { Link } from '../Link/Link';

const TestLinkListItem = (
  <>
    <h1 id="a">Heading</h1>
    <LinkList ariaDescribedBy="a">
      <LinkListItem data-testid="test-link">
        <Link href="/">Linkki</Link>
      </LinkListItem>
    </LinkList>
  </>
);

test('calling render with the same component on the same container does not remount', () => {
  const LinkListItemRendered = render(TestLinkListItem);
  const { getByTestId, container } = LinkListItemRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe('Linkki');
});

test('should not have underline class by default', () => {
  const { container } = render(TestLinkListItem);
  expect(container.firstChild).not.toHaveClass('fi-link--initial-underline');
});

test('should not have basic accessibility issues', axeTest(TestLinkListItem));
