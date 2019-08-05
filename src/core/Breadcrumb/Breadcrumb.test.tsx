import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Breadcrumb } from './Breadcrumb';

const TestBreadcrumb = (
  <Breadcrumb data-testid="Breadcrumb" aria-label="breadcrumb">
    <Breadcrumb.link href="/">Frontpage</Breadcrumb.link>
    <Breadcrumb.link href="/sub">Sub page</Breadcrumb.link>
    <Breadcrumb.link current={true}>Sub sub page</Breadcrumb.link>
  </Breadcrumb>
);

test('calling render with the same component on the same container does not remount', () => {
  const BreadcrumbRendered = render(TestBreadcrumb);
  const { container } = BreadcrumbRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestBreadcrumb));
