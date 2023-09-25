import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { Link } from './Link';

const TestLink = (
  <Link href="/" data-testid="test-link">
    Hey this is test
  </Link>
);

const LinkVariant = (
  <Link href="/" underline="initial">
    Link variant
  </Link>
);

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <Link href="/" margin="xs">
        Link
      </Link>,
    );
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('style', 'margin: 10px;');
  });

  it('should have margin prop overwritten from style prop', () => {
    const { container } = render(
      <Link href="/" margin="xs" style={{ margin: 2 }}>
        Link
      </Link>,
    );
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('style', 'margin: 2px;');
  });
});

test('calling render with the same component on the same container does not remount', () => {
  const LinkRendered = render(TestLink);
  const { getByTestId, container } = LinkRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe('Hey this is test');
});

test('should not have underline class by default', () => {
  const { container } = render(TestLink);
  expect(container.firstChild).not.toHaveClass('fi-link--initial-underline');
});

test('should have option with underline', () => {
  const { container } = render(LinkVariant);
  expect(container.firstChild).toHaveClass('fi-link--initial-underline');
});

test('should not have basic accessibility issues', axeTest(TestLink));
