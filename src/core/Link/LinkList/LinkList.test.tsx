import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { LinkListItem } from '../LinkListItem/LinkListItem';
import { LinkList } from './LinkList';
import { Link } from '../Link/Link';

const TestLinkList = (
  <>
    <h1 id="a">Heading</h1>
    <LinkList ariaDescribedBy="a">
      <LinkListItem data-testid="test-link">
        <Link href="/">Link</Link>
      </LinkListItem>
      <LinkListItem data-testid="test-link1">
        <Link href="/">AA Link</Link>
      </LinkListItem>
    </LinkList>
  </>
);

describe('Simple link list with one item', () => {
  it('Should be unordered', () => {
    const { getAllByRole } = render(TestLinkList);
    const firstLink = getAllByRole('link')[0];
    expect(firstLink.textContent).toBe('Link');
  });

  it('should match snapshot', () => {
    const { baseElement } = render(TestLinkList);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', axeTest(TestLinkList));
});
