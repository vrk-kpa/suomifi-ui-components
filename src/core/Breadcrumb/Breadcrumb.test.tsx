import React from 'react';
import { render } from 'react-testing-library';

import { Breadcrumb } from './Breadcrumb';

test('calling render with the same component on the same container does not remount', () => {
  const BreadcrumbRendered = render(
    <Breadcrumb data-testid="Breadcrumb" aria-label="breadcrumb">
      <Breadcrumb.link href="/">Frontpage</Breadcrumb.link>
      <Breadcrumb.link href="/sub">Sub page</Breadcrumb.link>
      <Breadcrumb.link current={true}>Sub sub page</Breadcrumb.link>
    </Breadcrumb>,
  );
  const { getByTestId, container } = BreadcrumbRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('Breadcrumb').textContent).toBe('Test');
});
