import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { ExternalLink } from './ExternalLink';

const TestExternalLink = (
  <ExternalLink
    href="/"
    data-testid="test-link"
    labelNewWindow="Opens in a new window"
  >
    Hey this is test
  </ExternalLink>
);

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <ExternalLink href="/" toNewWindow={false} margin="xs">
        Link
      </ExternalLink>,
    );
    const link = container.querySelector('a');
    expect(link).toHaveStyle('margin: 10px');
  });

  it('should have margin prop overwritten from style prop', () => {
    const { container } = render(
      <ExternalLink
        href="/"
        toNewWindow={false}
        margin="xs"
        style={{ margin: 2 }}
      >
        Link
      </ExternalLink>,
    );
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('style', 'margin: 2px;');
  });
});

test('matches snapshot', () => {
  const LinkRendered = render(TestExternalLink);
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe(
    'Hey this is testOpens in a new window',
  );
});

test('should not have basic accessibility issues', axeTest(TestExternalLink));
