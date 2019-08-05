import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Text } from './Text';

const TestTexts = (
  <div data-testid="test-text">
    <Text>Hey this is test</Text>
    <Text.lead>Hey this is test lead</Text.lead>
    <Text.bold>Hey this is test bold</Text.bold>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const TextRendered = render(TestTexts);
  const { container } = TextRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestTexts));
