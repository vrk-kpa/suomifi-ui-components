import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbLink } from '../BreadcrumbLink/BreadcrumbLink';

const TestBreadcrumb = (
  <Breadcrumb data-testid="Breadcrumb" aria-label="breadcrumb">
    <BreadcrumbLink href="/">Frontpage</BreadcrumbLink>
    <BreadcrumbLink href="/sub">Sub page</BreadcrumbLink>
    <BreadcrumbLink current={true}>Sub sub page</BreadcrumbLink>
  </Breadcrumb>
);

test('calling render with the same component on the same container does not remount', () => {
  const BreadcrumbRendered = render(TestBreadcrumb);
  const { container } = BreadcrumbRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestBreadcrumb));
