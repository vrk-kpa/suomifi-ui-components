import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test';

import { Block } from './Block';

const TestBlock = (
  <div data-testid="test-block">
    <Block>Hey this is test</Block>
    <Block padding="xxxl">Hey this is test lead</Block>
    <Block variant="section">Hey this is test bold</Block>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const BlockRendered = render(TestBlock);
  const { container } = BlockRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestBlock));
