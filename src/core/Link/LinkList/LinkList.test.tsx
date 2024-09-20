import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { LinkListItem } from '../LinkListItem/LinkListItem';
import { LinkList } from './LinkList';
import { Link } from '../Link/Link';

const TestLinkList = (
  <>
    <h1 id="a">Heading</h1>
    <LinkList ariaLabelledBy="a">
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

describe('Margin prop', () => {
  it('should have margin style from margin prop', () => {
    const { baseElement } = render(<LinkList ariaLabelledBy="" margin="xs" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should have margin prop overwritten from style prop', () => {
    const { container } = render(
      <LinkList ariaLabelledBy="" margin="xs" style={{ margin: 2 }} />,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});
