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

describe('margin prop', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <Breadcrumb aria-label="You are here" margin="xs" />,
    );
    const navigation = container.querySelector('nav');
    expect(navigation).toHaveAttribute('style', 'margin: 10px;');
  });

  it('should have margin prop style overwritten from style', () => {
    const { container } = render(
      <Breadcrumb
        aria-label="You are here"
        margin="xs"
        style={{ margin: 2 }}
      />,
    );
    const navigation = container.querySelector('nav');
    expect(navigation).toHaveAttribute('style', 'margin: 2px;');
  });
});

test('calling render with the same component on the same container does not remount', () => {
  const BreadcrumbRendered = render(TestBreadcrumb);
  const { container } = BreadcrumbRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestBreadcrumb));
