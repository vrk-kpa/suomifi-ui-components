import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Heading } from './Heading';

const TestHeadings = (
  <div data-testid="Heading">
    <Heading.h1hero>Test Heading</Heading.h1hero>
    <Heading.h1>Test Heading</Heading.h1>
    <Heading.h2>Test Heading</Heading.h2>
    <Heading.h3 as="h2">h3 as h2 text</Heading.h3>
    <Heading.h3>Test Heading</Heading.h3>
    <Heading.h4>Test Heading</Heading.h4>
    <Heading.h5>Test Heading</Heading.h5>
    <Heading.h6>Test Heading</Heading.h6>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const HeadingRendered = render(TestHeadings);
  const { container } = HeadingRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestHeadings));
