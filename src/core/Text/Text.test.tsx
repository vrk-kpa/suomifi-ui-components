import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { Paragraph } from '../Paragraph/Paragraph';
import { Text } from './Text';

const TestTexts = (
  <div data-testid="test-text">
    <Paragraph>Paragraph text</Paragraph>
    <Paragraph marginBottomSpacing="s">
      <Text.lead>Leading text</Text.lead>
    </Paragraph>
    <Paragraph>
      <Text>Body text</Text>
      <Text.bold>Bold text</Text.bold>
    </Paragraph>
    <Paragraph>
      <Text smallScreen={true}>Body text</Text>
      <Text.bold smallScreen={true}>Bold text</Text.bold>
    </Paragraph>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const TextRendered = render(TestTexts);
  const { container } = TextRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestTexts));
