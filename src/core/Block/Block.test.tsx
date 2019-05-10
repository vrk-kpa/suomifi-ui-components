import React from 'react';
import { render } from 'react-testing-library';

import { Block } from './Block';

test('calling render with the same component on the same container does not remount', () => {
  const BlockRendered = render(
    <div data-testid="test-block">
      <Block>Hey this is test</Block>
      <Block padding="xl">Hey this is test lead</Block>
      <Block.section>Hey this is test bold</Block.section>
    </div>,
  );
  const { container } = BlockRendered;
  expect(container.firstChild).toMatchSnapshot();
});
