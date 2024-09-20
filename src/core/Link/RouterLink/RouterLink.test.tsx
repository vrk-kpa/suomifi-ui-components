import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { RouterLink } from './RouterLink';

const TestRouterLink = (
  <RouterLink href="/" data-testid="test-link">
    Hey this is a test
  </RouterLink>
);

const RouterLinkAsButton = (
  <RouterLink asComponent="button">Router link as a button</RouterLink>
);

const RouterLinkVariant = (
  <RouterLink underline="initial">RouterLink variant</RouterLink>
);

const RouterLinkButtonVariant = (
  <RouterLink asComponent="button" underline="initial">
    Router link as button variant
  </RouterLink>
);

test('calling render with the same component on the same container does not remount', () => {
  const { getByTestId, container } = render(TestRouterLink);
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('test-link').textContent).toBe('Hey this is a test');
});

it('should still have the correct styles applied when rendered as something other than <a> ', () => {
  const { container } = render(RouterLinkAsButton);
  expect(container.firstChild).toHaveClass('fi-link--router');
});

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <RouterLink href="/" margin="xs">
        Link
      </RouterLink>,
    );
    const link = container.querySelector('a');
    expect(link).toHaveStyle('margin: 10px');
  });

  it('should have margin prop overwritten from style prop', () => {
    const { container } = render(
      <RouterLink href="/" margin="xs" style={{ margin: 2 }}>
        Link
      </RouterLink>,
    );
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('style', 'margin: 2px;');
  });
});

test('should not have underline by default', () => {
  const { container } = render(TestRouterLink);
  expect(container.firstChild).not.toHaveClass('fi-link--initial-underline');
});

test('should not have underline be default when rendered as something other than <a>', () => {
  const { container } = render(RouterLinkAsButton);
  expect(container.firstChild).not.toHaveClass('fi-link--initial-underline');
});

test('should have option for underline', () => {
  const { container } = render(RouterLinkVariant);
  expect(container.firstChild).toHaveClass('fi-link--initial-underline');
});

test('should have option for underline when rendered as something other than <a>', () => {
  const { container } = render(RouterLinkButtonVariant);
  expect(container.firstChild).toHaveClass('fi-link--initial-underline');
});

test('should not have basic accessibility issues', axeTest(TestRouterLink));
