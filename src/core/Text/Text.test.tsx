import React from 'react';
import { render } from 'react-testing-library';

import { Text } from './Text';

test('calling render with the same component on the same container does not remount', () => {
  const TextRendered = render(
    <div data-testid="test-text">
      <Text>Hey this is test</Text>
      <Text.lead>Hey this is test lead</Text.lead>
      <Text.bold>Hey this is test bold</Text.bold>
    </div>,
  );
  const { getByTestId, container } = TextRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('Text').textContent).toBe('Test');
});
